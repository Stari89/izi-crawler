import { router } from 'expo-router';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from '../hooks/use-api';
import {
    AuthConfirmDto,
    AuthEmailDto,
    AuthSafePasswordDto,
    AuthSignInDto,
    BadRequestDtoFromJSON,
    ResponseError,
} from '../api-client';
import { UseFormSetError } from 'react-hook-form';

const ACCESS_TOKEN_KEY = 'auth-context-access-token';
type PasswordSetMode = 'create' | 'reset';

interface AuthContextValue {
    login: (data: AuthSignInDto, setError: UseFormSetError<AuthSignInDto>) => Promise<void>;
    signup: (data: AuthEmailDto, setError: UseFormSetError<AuthEmailDto>) => Promise<void>;
    confirmEmail: (data: AuthConfirmDto, setError: UseFormSetError<AuthConfirmDto>) => Promise<void>;
    resetPassword: (data: AuthSafePasswordDto, setError: UseFormSetError<AuthSafePasswordDto>) => Promise<void>;
    forgotPassword: (data: AuthEmailDto, setError: UseFormSetError<AuthEmailDto>) => Promise<void>;
    logout: () => Promise<void>;
    emailToConfirm?: string;
    mode: PasswordSetMode;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [emailToConfirm, setEmailToConfirm] = useState<string>();
    const [emailConfirmationToken, setEmailConfirmationToken] = useState<string>();
    const [mode, setMode] = useState<PasswordSetMode>('create');

    const { authApi } = useApi();

    useEffect(() => {
        const tryLogin = async () => {
            const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            setAccessToken(token);
            if (accessToken) {
                router.replace(NAVIGATION_ROUTES.index);
            }
        };
        tryLogin();
    }, []);

    const login = async (data: AuthSignInDto, setError: UseFormSetError<AuthSignInDto>) => {
        try {
            const response = authApi.signIn(data);
            const token = (await response).accessToken;
            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
            setAccessToken(token);
            router.replace(NAVIGATION_ROUTES.index);
        } catch (err: any) {
            handleBadRequestErrors(err, setError);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        router.replace(NAVIGATION_ROUTES.welcome);
    };

    const signup = async (data: AuthEmailDto, setError: UseFormSetError<AuthEmailDto>) => {
        setMode('create');
        setEmailToConfirm(data.email);
        try {
            await authApi.signUp(data);
            await authApi.confirmationCode(data);
            router.replace(NAVIGATION_ROUTES.confirmationCode);
        } catch (err: any) {
            handleBadRequestErrors(err, setError);
        }
    };

    const confirmEmail = async (data: AuthConfirmDto, setError: UseFormSetError<AuthConfirmDto>) => {
        try {
            if (!emailToConfirm) {
                return;
            }
            const response = await authApi.confirmAccount({ ...data, email: emailToConfirm });
            setEmailConfirmationToken(response.accessToken);
            router.replace(NAVIGATION_ROUTES.setPassword);
        } catch (err: any) {
            handleBadRequestErrors(err, setError);
        }
    };

    const resetPassword = async (data: AuthSafePasswordDto, setError: UseFormSetError<AuthSafePasswordDto>) => {
        try {
            await authApi.resetPassword(data, ({ init }) =>
                Promise.resolve({
                    ...init,
                    headers: { ...init.headers, Authorization: `Bearer ${emailConfirmationToken}` },
                }),
            );
            router.replace(NAVIGATION_ROUTES.authSuccessScreen);
        } catch (err: any) {
            handleBadRequestErrors(err, setError);
        }
    };

    const forgotPassword = async (data: AuthEmailDto, setError: UseFormSetError<AuthEmailDto>) => {
        setMode('reset');
        setEmailToConfirm(data.email);
        try {
            await authApi.confirmationCode(data);
            router.replace(NAVIGATION_ROUTES.confirmationCode);
        } catch (err: any) {
            handleBadRequestErrors(err, setError);
        }
    };

    const contextValue: AuthContextValue = {
        isAuthenticated: !!accessToken,
        login,
        logout,
        signup,
        emailToConfirm,
        confirmEmail,
        resetPassword,
        forgotPassword,
        mode,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const handleBadRequestErrors = async (responseError: any, setError: UseFormSetError<any>) => {
    if (responseError.constructor !== ResponseError || responseError.response.status !== 400) {
        return;
    }
    const { errors } = BadRequestDtoFromJSON(await responseError.response.json());
    // @ts-ignore
    Object.keys(errors).forEach((e) => setError(e.toString(), { message: errors[e] }));
};
