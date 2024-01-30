import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';
import { useEffect } from 'react';
import { useCrawlRoute } from '../hooks';

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

    useEffect(() => {
        const crawlRoute = getCrawlRoute(route.params.guid);
        navigation.setOptions({ title: crawlRoute?.name });
    }, []);

    const handleMapButtonPress = () => {
        navigation.navigate(NAVIGATION_NAMES.crawlRouteMap);
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Crawl Route Details Screen</Text>
            <Button mode="outlined" onPress={handleMapButtonPress}>
                View on map
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
