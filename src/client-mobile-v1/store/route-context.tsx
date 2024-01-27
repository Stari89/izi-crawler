import { ReactNode, createContext, useEffect, useState } from 'react';
import { Route } from '../models';
import { LOGGED_USER, ROUTES } from '../data/dummy-data';

interface RouteContextValue {
    myRoutes: Route[];
    favoriteRoutes: Route[];
}

export const RouteContext = createContext<RouteContextValue | null>(null);

interface RouteProviderProps {
    children: ReactNode;
}
export const RouteProvider = (props: RouteProviderProps) => {
    const { children } = props;

    const [myRoutes, setMyRoutes] = useState<Route[]>([]);
    const [favoriteRoutes, setFavoriteRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const myRoutes = ROUTES.filter((route) => route.createdBy.guid === LOGGED_USER.guid);
        setMyRoutes(myRoutes);

        const favoriteRoutes = ROUTES.filter((route) => route.favorite);
        setFavoriteRoutes(favoriteRoutes);
    }, []);

    const contextValue: RouteContextValue = {
        myRoutes,
        favoriteRoutes,
    };

    return <RouteContext.Provider value={contextValue}>{children}</RouteContext.Provider>;
};
