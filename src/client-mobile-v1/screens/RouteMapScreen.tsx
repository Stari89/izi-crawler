import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute } from '../models';
import RouteMapView from '../components/map/RouteMapView';
import { useLocalSearchParams } from 'expo-router';

const CrawlRouteMapScreen = () => {
    const theme = useTheme();
    const { guid } = useLocalSearchParams();
    const { getCrawlRoute } = useCrawlRoute();

    const [crawlRoute, setCrawlRoute] = useState<CrawlRoute>();

    useEffect(() => {
        if (typeof guid !== 'string') {
            return;
        }
        const crawlRoute = getCrawlRoute(guid);
        setCrawlRoute(crawlRoute);
    }, [guid]);

    if (!crawlRoute) {
        return null;
    }

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <RouteMapView style={styles.mapView} venues={crawlRoute.venues} showVenueMarkers />
        </View>
    );
};

export default CrawlRouteMapScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    mapView: {
        flex: 1,
    },
});
