import { Avatar, Surface, Text } from 'react-native-paper';
import { PostCrawl } from '../../models';
import { StyleSheet, View } from 'react-native';
import RouteMapView from '../map/RouteMapView';

interface PostCrawlItemProps {
    post: PostCrawl;
}
const PostCrawlItem = (props: PostCrawlItemProps) => {
    const { post } = props;
    const { created, name, user, crawlRoute, participants, location } = post;
    return (
        <Surface style={styles.surface}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Avatar.Image source={user.avatar} size={48} />
                    <View style={styles.headerTitle}>
                        <Text variant="titleMedium">{name}</Text>
                        <Text variant="bodySmall" style={styles.headerSubtitle}>
                            {created.toLocaleDateString()} in {location} with {participants.length - 1} other people
                        </Text>
                    </View>
                </View>
                {crawlRoute && <RouteMapView venues={crawlRoute.venues} style={styles.mapView} />}
            </View>
        </Surface>
    );
};
export default PostCrawlItem;

const styles = StyleSheet.create({
    surface: {
        paddingVertical: 8,
        marginVertical: 8,
    },
    container: {},
    header: {
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 8,
    },
    headerTitle: {
        marginLeft: 8,
    },
    headerSubtitle: {
        opacity: 0.5,
        marginTop: 4,
    },
    mapView: {
        height: 200,
        width: '100%',
    },
});
