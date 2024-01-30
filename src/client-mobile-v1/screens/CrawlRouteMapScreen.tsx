import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from 'react-native-paper';

const CrawlRouteMapScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <MapView style={styles.mapView} />
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
