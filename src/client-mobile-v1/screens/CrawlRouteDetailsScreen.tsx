import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';
import { useEffect, useState } from 'react';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute } from '../models';
import VenuesList from '../components/venues-list/VenuesList';

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

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        navigation.setOptions({ title: crawlRoute?.name });
        setCrawlRoute(crawlRoute);
    }, []);

    const handleMapButtonPress = () => {
        navigation.navigate(NAVIGATION_NAMES.crawlRouteMap, { guid: route.params.guid });
    };

    const canViewMap = !!crawlRoute && crawlRoute.venues.length > 0;

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            {/* <Text>Crawl Route Details Screen</Text>
            <Button mode="outlined" onPress={handleMapButtonPress} disabled={!canViewMap}>
                {canViewMap ? 'View on Map' : 'No Venues'}
            </Button> */}
            <View style={styles.detailsView}>
                <Text variant="bodySmall" style={styles.createdInfo}>
                    Created by {crawlRoute?.createdBy.name} on {crawlRoute?.createdOn.toLocaleDateString()}
                </Text>
                <Text style={styles.headline} variant="headlineMedium">
                    {crawlRoute?.name}
                </Text>
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
                            6.4 km
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
                            4:20
                        </Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
            </View>
            <VenuesList venueItems={crawlRoute?.venues || []} />
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
    createdInfo: {
        opacity: 0.5,
    },
    headline: {
        marginTop: 4,
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
