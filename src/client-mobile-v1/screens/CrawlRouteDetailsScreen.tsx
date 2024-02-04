import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';
import { useEffect, useState } from 'react';
import { useCrawlRoute } from '../hooks';
import { CrawlRoute } from '../models';

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
            <Text>Crawl Route Details Screen</Text>
            <Button mode="outlined" onPress={handleMapButtonPress} disabled={!canViewMap}>
                {canViewMap ? 'View on Map' : 'No Venues'}
            </Button>
        </View>
    );
};

export default CrawlRouteDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
});
