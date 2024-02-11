import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute, Stat, Venue } from '../models';
import VenuesList from '../components/venues-list/VenuesList';
import { LatLng } from 'react-native-maps';
import RouteMapView from '../components/map/RouteMapView';
import { composeAppTitle } from '../util/screen-title';
import { router, useLocalSearchParams } from 'expo-router';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import StatsTable from '../components/ui/StatsTable';

const CrawlRouteScreen = () => {
    const theme = useTheme();
    const { guid } = useLocalSearchParams();

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { getCrawlRoute } = useCrawlRoute();
    const [crawlRoute, setCrawlRoute] = useState<CrawlRoute>();

    const [markerPosition, setMarkerPosition] = useState<LatLng>();

    useEffect(() => {
        if (typeof guid !== 'string') {
            return;
        }
        const crawlRoute = getCrawlRoute(guid);
        navigation.setOptions({ headerTitle: crawlRoute?.name, title: composeAppTitle(crawlRoute?.name) });
        setCrawlRoute(crawlRoute);
    }, [guid]);

    const handleMapButtonPress = () => {
        router.navigate(NAVIGATION_ROUTES.routeMap.replace('[guid]', guid as string));
    };

    const handleVenuePress = (venue: Venue) => {
        setMarkerPosition(venue.location);
    };

    const stats: Stat[] = [
        {
            label: 'Venues',
            value: crawlRoute?.venues.length,
        },
        {
            label: 'Distance',
            value: `${crawlRoute?.distance.toFixed(2)} km`,
        },
        {
            label: 'People Finished',
            value: crawlRoute?.finishedBy,
        },
        {
            label: 'Expected time',
            value: crawlRoute?.expectedTimeToFinish,
        },
    ];

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
                <StatsTable stats={stats} columns={2} />
            </View>
            <VenuesList venueItems={crawlRoute?.venues || []} onVenuePress={handleVenuePress} />
        </View>
    );
};

export default CrawlRouteScreen;

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
});
