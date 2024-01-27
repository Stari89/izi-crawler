import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CrawlRoute } from '../models';
import { CRAWL_ROUTES, LOGGED_USER } from '../data/dummy-data';
import CrawlRoutesList from '../constants/crawl-routes-list/CrawlRoutesList';

const CrawlRoutesScreen = () => {
    const theme = useTheme();
    const route = useRoute();
    const { myRoutes } = route.params as { myRoutes: boolean };

    const [crawlRoutes, setCrawlRoutes] = useState<CrawlRoute[]>([]);

    useEffect(() => {
        const fetchedCrawlRoutes = CRAWL_ROUTES.filter((crawlRoute) =>
            myRoutes ? crawlRoute.createdBy.guid === LOGGED_USER.guid : crawlRoute.favorite,
        );
        setCrawlRoutes(fetchedCrawlRoutes);
    }, []);

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <CrawlRoutesList crawlRouteItems={crawlRoutes} />
        </View>
    );
};

export default CrawlRoutesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
});
