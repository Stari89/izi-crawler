import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const CrawlRouteMapScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Crawl Route Details Screen</Text>
        </View>
    );
};

export default CrawlRouteMapScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
});
