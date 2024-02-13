import { Post } from '../../models';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface FeedListProps {
    posts: Post[];
}
const FeedList = (props: FeedListProps) => {
    const { posts } = props;

    const renderItem = ({ item }: { item: Post }) => (
        <>
            <Text>Post</Text>
        </>
    );

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
