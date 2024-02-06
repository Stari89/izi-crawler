import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Avatar, Divider, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';
import { useEffect, useState } from 'react';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute, Venue } from '../models';
import VenuesList from '../components/venues-list/VenuesList';
import { LatLng } from 'react-native-maps';
import RouteMapView from '../components/map/RouteMapView';
import { composeAppTitle } from '../util/screen-title';

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

    const [markerPosition, setMarkerPosition] = useState<LatLng>();

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        navigation.setOptions({ headerTitle: crawlRoute?.name, title: composeAppTitle(crawlRoute?.name) });
        setCrawlRoute(crawlRoute);
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
                {crawlRoute && (
                    <View style={styles.mapViewContainer}>
                        <RouteMapView
                            venues={crawlRoute.venues}
                            style={styles.mapView}
                            onPress={handleMapButtonPress}
                            markerPosition={markerPosition}
                        />
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
