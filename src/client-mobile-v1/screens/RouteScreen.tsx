import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useCrawlRoute, useOrientation } from '../hooks';
import { CrawlRoute, Stat, Venue } from '../models';
import VenuesList from '../components/venues-list/VenuesList';
import { LatLng } from 'react-native-maps';
import RouteMapView from '../components/map/RouteMapView';
import { composeAppTitle } from '../util/screen-title';
import { router, useLocalSearchParams } from 'expo-router';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';
import StatsTable from '../components/ui/StatsTable';
import { Orientation } from 'expo-screen-orientation';

const CrawlRouteScreen = () => {
    const theme = useTheme();
    const { guid } = useLocalSearchParams();
    const { currentOrientation } = useOrientation();

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
    const isPortrait =
        currentOrientation === Orientation.PORTRAIT_UP || currentOrientation === Orientation.PORTRAIT_DOWN;

    return (
        <View
            style={[
                styles.rootContainer,
                { backgroundColor: theme.colors.background },
                !isPortrait && styles.rootContainerLandscape,
            ]}
        >
            <View style={[!isPortrait && styles.mainContainerLandscape]}>
                <View style={styles.header}>
                    {crawlRoute?.createdBy.avatar ? (
                        <Avatar.Image source={crawlRoute.createdBy.avatar} size={48} style={styles.avatar} />
                    ) : (
                        <Avatar.Text label={crawlRoute?.createdBy.initials || ''} size={48} style={styles.avatar} />
                    )}
                    <View>
                        <Text variant="bodySmall" style={styles.createdInfo}>
                            Created by {crawlRoute?.createdBy.name} on {crawlRoute?.createdOn.toLocaleDateString()}
                        </Text>
                        <Text style={styles.headline} variant="headlineMedium">
                            {crawlRoute?.name}
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    {isPortrait && crawlRoute && (
                        <RouteMapView
                            venues={crawlRoute.venues}
                            style={styles.mapView}
                            onPress={handleMapButtonPress}
                            markerPosition={markerPosition}
                        />
                    )}
                    <StatsTable stats={stats} columns={2} />
                    <VenuesList venueItems={crawlRoute?.venues || []} onVenuePress={handleVenuePress} />
                </ScrollView>
            </View>
            {!isPortrait && crawlRoute && (
                <RouteMapView
                    venues={crawlRoute.venues}
                    style={styles.mapViewLandscape}
                    onPress={handleMapButtonPress}
                    markerPosition={markerPosition}
                />
            )}
        </View>
    );
};

export default CrawlRouteScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    rootContainerLandscape: {
        flexDirection: 'row',
    },
    mainContainerLandscape: {
        maxWidth: 600,
    },
    header: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 8,
        marginHorizontal: 8,
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
    mapView: {
        height: 200,
    },
    mapViewLandscape: {
        height: '100%',
        flex: 1,
    },
});
