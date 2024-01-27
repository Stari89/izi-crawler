import { ReactNode, createContext, useEffect, useState } from 'react';
import { CrawlRoute } from '../models';
import { LOGGED_USER, CRAWL_ROUTES } from '../data/dummy-data';

interface CrawlRouteContextValue {
    myRoutes: CrawlRoute[];
    favoriteRoutes: CrawlRoute[];
}

export const CrawlRouteContext = createContext<CrawlRouteContextValue | null>(null);

interface CrawlRouteProviderProps {
    children: ReactNode;
}
export const CrawlRouteProvider = (props: CrawlRouteProviderProps) => {
    const { children } = props;

    const [myRoutes, setMyRoutes] = useState<CrawlRoute[]>([]);
    const [favoriteRoutes, setFavoriteRoutes] = useState<CrawlRoute[]>([]);

    useEffect(() => {
        const myRoutes = CRAWL_ROUTES.filter((route) => route.createdBy.guid === LOGGED_USER.guid);
        setMyRoutes(myRoutes);

        const favoriteRoutes = CRAWL_ROUTES.filter((route) => route.favorite);
        setFavoriteRoutes(favoriteRoutes);
    }, []);

    const contextValue: CrawlRouteContextValue = {
        myRoutes,
        favoriteRoutes,
    };

    return <CrawlRouteContext.Provider value={contextValue}>{children}</CrawlRouteContext.Provider>;
};
