import { useContext } from 'react';
import { CrawlRouteContext } from '../store';

export const useCrawlRoute = () => {
    const contextValue = useContext(CrawlRouteContext);
    if (!contextValue) {
        throw new Error('RouteContext not found. Make sure RouteProvider is properly set up.');
    }
    return contextValue;
};
