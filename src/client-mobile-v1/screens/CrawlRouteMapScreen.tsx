import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute } from '../models';
import RouteMapView from '../components/map/RouteMapView';

type ParamList = {
    Detail: {
        guid: string;
    };
};

const CrawlRouteMapScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const { getCrawlRoute } = useCrawlRoute();

    const [crawlRoute, setCrawlRoute] = useState<CrawlRoute>();

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        setCrawlRoute(crawlRoute);
    }, [route]);

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
