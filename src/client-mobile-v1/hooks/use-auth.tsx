import { useContext } from 'react';
import { AuthContext } from '../store';

export const useAuth = () => {
    const contextValue = useContext(AuthContext);
    if (!contextValue) {
        throw new Error('AuthContext not found. Make sure AuthProvider is properly set up.');
    }
    return contextValue;
};
