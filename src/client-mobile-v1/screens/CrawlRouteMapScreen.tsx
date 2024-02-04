import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE, LatLng, Polyline } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute } from '../models';

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
    const [region, setRegion] = useState<Region>();

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        setCrawlRoute(crawlRoute);
        if (crawlRoute?.venues.length === 0) {
            return;
        }
        const latList = crawlRoute?.venues.map((v) => v.location.latitude);
        const lngList = crawlRoute?.venues.map((v) => v.location.longitude);

        if (!latList || !lngList || latList.length === 0 || lngList.length === 0) {
            return;
        }

        const latMin = Math.min(...latList);
        const latMax = Math.max(...latList);
        const lngMin = Math.min(...lngList);
        const lngMax = Math.max(...lngList);

        const region: Region = {
            latitude: (latMin + latMax) / 2,
            longitude: (lngMin + lngMax) / 2,
            latitudeDelta: (latMax - latMin) * 1.5,
            longitudeDelta: (lngMax - lngMin) * 1.5,
        };

        setRegion(region);
    }, [route]);

    if (!region || !crawlRoute) {
        return null;
    }

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <MapView style={styles.mapView} region={region} provider={PROVIDER_GOOGLE}>
                {crawlRoute.venues.map((v) => (
                    <Marker key={v.guid} coordinate={v.location} style={{ opacity: 0.7 }} />
                ))}
                <Polyline
                    coordinates={crawlRoute.venues.map((v) => v.location)}
                    strokeWidth={2.5}
                    strokeColor={theme.colors.secondary}
                    lineDashPattern={[0, 5]}
                />
            </MapView>
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
