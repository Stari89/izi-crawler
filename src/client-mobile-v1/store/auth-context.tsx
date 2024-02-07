import { router } from 'expo-router';
import { ReactNode, createContext, useState } from 'react';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
        router.replace(NAVIGATION_ROUTES.index);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const contextValue: AuthContextValue = {
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
