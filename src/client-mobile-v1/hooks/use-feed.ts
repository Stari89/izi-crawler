import { useContext } from 'react';
import { FeedContext } from '../store/FeedContext';

export const useFeed = () => {
    const contextValue = useContext(FeedContext);
    if (!contextValue) {
        throw new Error('FeedContext not found. Make sure FeedProvider is properly set up.');
    }
    return contextValue;
};
