import { ReactNode, createContext, useEffect, useState } from 'react';
import { CrawlRoute } from '../models';
import { LOGGED_USER, CRAWL_ROUTES } from '../data/dummy-data';

interface CrawlRouteContextValue {
    myRoutes: CrawlRoute[];
    favoriteRoutes: CrawlRoute[];
    getCrawlRoute: (guid: string) => CrawlRoute | undefined;
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
        const myRoutes = CRAWL_ROUTES.filter((route) => route.createdBy.guid === LOGGED_USER.guid).sort(
            (a, b) => b.createdOn.getTime() - a.createdOn.getTime(),
        );
        setMyRoutes(myRoutes);

        const favoriteRoutes = CRAWL_ROUTES.filter((route) => route.favorite).sort(
            (a, b) => b.createdOn.getTime() - a.createdOn.getTime(),
        );
        setFavoriteRoutes(favoriteRoutes);
    }, []);

    const getCrawlRoute = (guid: string) => {
        return CRAWL_ROUTES.find((r) => r.guid === guid);
    };

    const contextValue: CrawlRouteContextValue = {
        myRoutes,
        favoriteRoutes,
        getCrawlRoute,
    };

    return <CrawlRouteContext.Provider value={contextValue}>{children}</CrawlRouteContext.Provider>;
};
