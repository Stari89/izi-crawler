import { Avatar, Button, Card, Surface, Text } from 'react-native-paper';
import { FollowerSuggestion, PostFollowerSuggestion } from '../../models';
import { FlatList, StyleSheet, View } from 'react-native';

interface PostFollowerSuggestionItemProps {
    post: PostFollowerSuggestion;
}
const PostFollowerSuggestionItem = (props: PostFollowerSuggestionItemProps) => {
    const { post } = props;

    const renderItem = ({ item, index }: { item: FollowerSuggestion; index: number }) => (
        <FollowerSuggestionListItem followerSuggestion={item} index={index} />
    );

    return (
        <Surface style={styles.surface} elevation={3}>
            <Text variant="titleMedium" style={styles.title}>
                Who to follow
            </Text>
            <FlatList
                data={post.followerSuggestions}
                keyExtractor={(i) => i.user.guid}
                renderItem={renderItem}
                horizontal={true}
            />
        </Surface>
    );
};
export default PostFollowerSuggestionItem;

interface FollowerSuggestionListItemProps {
    followerSuggestion: FollowerSuggestion;
    index: number;
}
const FollowerSuggestionListItem = (props: FollowerSuggestionListItemProps) => {
    const { followerSuggestion, index } = props;
    const { reason, user } = followerSuggestion;
    return (
        <Card style={[styles.itemCard, index === 0 && styles.itemCardFirst]} mode="contained">
            <View style={styles.itemContainer}>
                <Avatar.Image source={user.avatar} size={72} />
                <Text style={styles.itemUserName}>{user.name}</Text>
                <Text style={styles.itemReason} variant="bodySmall">
                    {reason}
                </Text>
                <Button mode="contained">Follow</Button>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    surface: {
        paddingTop: 8,
        marginBottom: 24,
    },
    title: {
        marginHorizontal: 8,
    },
    itemCardFirst: {
        marginLeft: 8,
    },
    itemCard: {
        padding: 8,
        marginVertical: 8,
        marginRight: 8,
    },
    itemContainer: {
        minWidth: 200,
        alignItems: 'center',
    },
    itemUserName: {
        fontWeight: 'bold',
        marginTop: 4,
    },
    itemReason: {
        opacity: 0.5,
        marginVertical: 16,
    },
});
