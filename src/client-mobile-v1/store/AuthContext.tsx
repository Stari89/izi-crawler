import { router } from 'expo-router';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'auth-context-access-token';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const [accessToken, setAccessToken] = useState<string | null>(null);

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

    const contextValue: AuthContextValue = {
        isAuthenticated: !!accessToken,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
