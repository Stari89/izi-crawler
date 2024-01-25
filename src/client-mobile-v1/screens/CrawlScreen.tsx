import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const CrawlScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Crawl Screen</Text>
        </View>
    );
};

export default CrawlScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
