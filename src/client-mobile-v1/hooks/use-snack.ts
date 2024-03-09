import { useContext } from 'react';
import { SnackContext } from '../store/SnackContext';

export const useSnack = () => {
    const contextValue = useContext(SnackContext);
    if (!contextValue) {
        throw new Error('SnackContext not found. Make sure SnackProvider is properly set up.');
    }
    return contextValue;
};
