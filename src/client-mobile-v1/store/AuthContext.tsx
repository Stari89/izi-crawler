import { router } from 'expo-router';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi, useSnack } from '../hooks';
import { AuthConfirmDto, AuthEmailDto, AuthSafePasswordDto, AuthSignInDto, ResponseError } from '../api-client';

const ACCESS_TOKEN_KEY = 'auth-context-access-token';
type PasswordSetMode = 'create' | 'reset';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (data: AuthSignInDto) => Promise<void>;
    logout: () => Promise<void>;
    signup: (data: AuthEmailDto) => Promise<void>;
    emailToConfirm?: string;
    confirmEmail: (data: AuthConfirmDto) => Promise<void>;
    resetPassword: (data: AuthSafePasswordDto) => Promise<void>;
    forgotPassword: (data: AuthEmailDto) => Promise<void>;
    mode: PasswordSetMode;
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
    const { pushSnack } = useSnack();

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

    const login = async (data: AuthSignInDto) => {
        try {
            const response = authApi.signIn(data);
            const token = (await response).accessToken;
            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
            setAccessToken(token);
            router.replace(NAVIGATION_ROUTES.index);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Malformed input. (TODO)');
                            break;
                        case 401:
                            pushSnack('Incorrect email or password.');
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        router.replace(NAVIGATION_ROUTES.welcome);
    };

    const signup = async (data: AuthEmailDto) => {
        setMode('create');
        setEmailToConfirm(data.email);
        try {
            await authApi.signUp(data);
            const response = await authApi.confirmationCode(data);
            setEmailConfirmationToken(response.accessToken);
            router.replace(NAVIGATION_ROUTES.confirmationCode);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Invalid data. (TODO)');
                            break;
                        case 401:
                            pushSnack('Email is not registered.');
                            break;
                        case 409:
                            pushSnack('Email is already registered.');
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
        }
    };

    const confirmEmail = async (data: AuthConfirmDto) => {
        try {
            await authApi.confirmAccount(data, ({ init }) =>
                Promise.resolve({
                    ...init,
                    headers: { ...init.headers, Authorization: `Bearer ${emailConfirmationToken}` },
                }),
            );
            router.replace(NAVIGATION_ROUTES.setPassword);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Malformed input. (TODO)');
                            break;
                        case 401:
                            pushSnack('Confirmation code was wrong.');
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
        }
    };

    const resetPassword = async (data: AuthSafePasswordDto) => {
        try {
            await authApi.resetPassword(data, ({ init }) =>
                Promise.resolve({
                    ...init,
                    headers: { ...init.headers, Authorization: `Bearer ${emailConfirmationToken}` },
                }),
            );
            router.replace(NAVIGATION_ROUTES.authSuccessScreen);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Malformed input. (TODO)');
                            break;
                        case 401:
                            pushSnack("You're not allowed to do that.");
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
        }
    };

    const forgotPassword = async (data: AuthEmailDto) => {
        setMode('reset');
        setEmailToConfirm(data.email);
        try {
            const response = await authApi.confirmationCode(data);
            setEmailConfirmationToken(response.accessToken);
            router.replace(NAVIGATION_ROUTES.confirmationCode);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Malformed input. (TODO)');
                            break;
                        case 401:
                            pushSnack('Email is not registered.');
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
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
