import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { NAVIGATION_NAMES } from '../constants/navigation-names';

const CrawlRouteDetailsScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
