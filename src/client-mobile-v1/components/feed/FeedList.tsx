import { Post } from '../../models';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import FeedItem from './FeedItem';

interface FeedListProps {
    posts: Post[];
}
const FeedList = (props: FeedListProps) => {
    const { posts } = props;

    const renderItem = ({ item }: { item: Post }) => <FeedItem post={item} />;

    if (!posts.length) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.noItemsContainer}>
                    <Text>Nothing in your feed ...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList data={posts} keyExtractor={(i) => i.guid} renderItem={renderItem} />
        </View>
    );
};

export default FeedList;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    noItemsContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
});
