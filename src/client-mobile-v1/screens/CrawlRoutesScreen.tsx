import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CrawlRoute } from '../models';
import { CRAWL_ROUTES, LOGGED_USER } from '../data/dummy-data';

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
            <Text>Routes Screen {crawlRoutes.length}</Text>
        </View>
    );
};

export default CrawlRoutesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
