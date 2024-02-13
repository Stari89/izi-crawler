import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import FeedList from '../components/feed/FeedList';
import { useFeed } from '../hooks/use-feed';

const HomeScreen = () => {
    const theme = useTheme();
    const { feed } = useFeed();

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <FeedList posts={feed} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
