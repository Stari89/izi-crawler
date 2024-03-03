import { useContext } from 'react';
import { ApiContext } from '../store';

export const useApi = () => {
    const contextValue = useContext(ApiContext);
    if (!contextValue) {
        throw new Error('ApiContext not found. Make sure ApiProvider is properly set up.');
    }
    return contextValue;
};
