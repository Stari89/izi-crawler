import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';
import { useEffect, useState } from 'react';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute, Venue } from '../models';
import VenuesList from '../components/venues-list/VenuesList';
import MapView, { LatLng, Marker, Polyline, Region } from 'react-native-maps';

type ParamList = {
    Detail: {
        guid: string;
    };
};

const CrawlRouteDetailsScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const { getCrawlRoute } = useCrawlRoute();
    const [crawlRoute, setCrawlRoute] = useState<CrawlRoute>();

    const [region, setRegion] = useState<Region>();
    const [markerPosition, setMarkerPosition] = useState<LatLng>();

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        navigation.setOptions({ title: crawlRoute?.name });
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
    }, []);

    const handleMapButtonPress = () => {
        navigation.navigate(NAVIGATION_NAMES.crawlRouteMap, { guid: route.params.guid });
    };

    const handleVenuePress = (venue: Venue) => {
        setMarkerPosition(venue.location);
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.detailsView}>
                <View style={styles.header}>
                    <Avatar.Text label={crawlRoute?.createdBy.initials || ''} size={48} style={styles.avatar} />
                    <View>
                        <Text variant="bodySmall" style={styles.createdInfo}>
                            Created by {crawlRoute?.createdBy.name} on {crawlRoute?.createdOn.toLocaleDateString()}
                        </Text>
                        <Text style={styles.headline} variant="headlineMedium">
                            {crawlRoute?.name}
                        </Text>
                    </View>
                </View>
                {region && crawlRoute && (
                    <View style={styles.mapViewContainer}>
                        <MapView
                            style={styles.mapView}
                            region={region}
                            onPress={handleMapButtonPress}
                            liteMode={true}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            scrollEnabled={false}
                        >
                            {markerPosition && <Marker coordinate={markerPosition} />}
                            <Polyline
                                coordinates={crawlRoute.venues.map((v) => v.location)}
                                strokeWidth={2.5}
                                strokeColor={theme.colors.secondary}
                                lineDashPattern={[0, 5]}
                            />
                        </MapView>
                    </View>
                )}
                <Divider style={styles.divider} />
                <View style={styles.statsRow}>
                    <View style={styles.statsCell}>
                        <Text variant="labelSmall" style={styles.statsLabel}>
                            Venues
                        </Text>
                        <Text variant="displaySmall" style={styles.statsValue}>
                            {crawlRoute?.venues.length}
                        </Text>
                    </View>
                    <View style={[styles.verticalDivider, { backgroundColor: theme.colors.onBackground }]}></View>
                    <View style={styles.statsCell}>
                        <Text variant="labelSmall" style={styles.statsLabel}>
                            Distance
                        </Text>
                        <Text variant="displaySmall" style={styles.statsValue}>
                            {crawlRoute?.distance.toFixed(2)} km
                        </Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.statsRow}>
                    <View style={styles.statsCell}>
                        <Text variant="labelSmall" style={styles.statsLabel}>
                            People Finished
                        </Text>
                        <Text variant="displaySmall" style={styles.statsValue}>
                            {crawlRoute?.finishedBy}
                        </Text>
                    </View>
                    <View style={[styles.verticalDivider, { backgroundColor: theme.colors.onBackground }]}></View>
                    <View style={styles.statsCell}>
                        <Text variant="labelSmall" style={styles.statsLabel}>
                            Expected time
                        </Text>
                        <Text variant="displaySmall" style={styles.statsValue}>
                            {crawlRoute?.expectedTimeToFinish}
                        </Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
            </View>
            <VenuesList venueItems={crawlRoute?.venues || []} onVenuePress={handleVenuePress} />
        </View>
    );
};

export default CrawlRouteDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    detailsView: {
        marginHorizontal: 8,
        marginTop: 16,
    },
    header: {
        flexDirection: 'row',
    },
    avatar: {
        marginRight: 16,
    },
    createdInfo: {
        opacity: 0.5,
    },
    headline: {
        marginTop: 4,
    },
    mapViewContainer: {
        marginTop: 16,
    },
    mapView: {
        height: 200,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    statsCell: {
        alignItems: 'center',
        flex: 1,
    },
    statsLabel: {
        opacity: 0.5,
        fontWeight: '100',
    },
    statsValue: {},
    verticalDivider: {
        width: 0.5,
        opacity: 0.2,
    },
    divider: {
        marginVertical: 16,
    },
});
