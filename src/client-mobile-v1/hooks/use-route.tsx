import { useContext } from 'react';
import { RouteContext } from '../store';

export const useRoute = () => {
    const contextValue = useContext(RouteContext);
    if (!contextValue) {
        throw new Error('RouteContext not found. Make sure RouteProvider is properly set up.');
    }
    return contextValue;
};
