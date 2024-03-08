import { router } from 'expo-router';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from '../hooks';
import { AuthConfirmDto, AuthEmailDto, AuthTokenDto } from '../api-client';

const ACCESS_TOKEN_KEY = 'auth-context-access-token';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (data: AuthEmailDto) => Promise<void>;
    emailToConfirm?: string;
    confirmEmail: (data: AuthConfirmDto) => Promise<void>;
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

    const login = async (token: string) => {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
        setAccessToken(token);
        router.replace(NAVIGATION_ROUTES.index);
    };

    const logout = async () => {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        router.replace(NAVIGATION_ROUTES.welcome);
    };

    const signup = async (data: AuthEmailDto) => {
        // TODO: handle errors here instead of on the component
        await authApi.signUp(data);
        setEmailToConfirm(data.email);
        const response = await authApi.confirmationCode(data);
        setEmailConfirmationToken(response.accessToken);
        router.replace(NAVIGATION_ROUTES.confirmationCode);
    };

    const confirmEmail = async (data: AuthConfirmDto) => {
        const response = await authApi.confirmAccount(data, ({ init, context }) =>
            Promise.resolve({
                ...init,
                headers: { ...init.headers, Authorization: `Bearer ${emailConfirmationToken}` },
            }),
        );
        console.log(response);
    };

    const contextValue: AuthContextValue = {
        isAuthenticated: !!accessToken,
        login,
        logout,
        signup,
        emailToConfirm,
        confirmEmail,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
