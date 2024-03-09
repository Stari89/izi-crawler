import { useContext } from 'react';
import { OrientationContext } from '../store/OrientationContext';

export const useOrientation = () => {
    const contextValue = useContext(OrientationContext);
    if (!contextValue) {
        throw new Error('OrientationContext not found. Make sure OrientationProvider is properly set up.');
    }
    return contextValue;
};
