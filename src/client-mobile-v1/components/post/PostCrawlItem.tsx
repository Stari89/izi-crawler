import { Avatar, Divider, IconButton, Menu, Surface, Text } from 'react-native-paper';
import { PostCrawl, Stat } from '../../models';
import { StyleSheet, View } from 'react-native';
import RouteMapView from '../map/RouteMapView';
import { useState } from 'react';
import StatsTable from '../ui/StatsTable';

interface PostCrawlItemProps {
    post: PostCrawl;
}
const PostCrawlItem = (props: PostCrawlItemProps) => {
    const { post } = props;
    const { created, name, user, crawlRoute, participants, location } = post;

    const [menuVisible, setMenuOpen] = useState(false);

    const handleDotsPress = () => {
        setMenuOpen(true);
    };

    const handleMenuDismiss = () => {
        setMenuOpen(false);
    };

    const stats: Stat[] = [
        {
            label: 'Venues visited',
            value: crawlRoute?.venues.length,
        },
        {
            label: 'Time taken',
            value: crawlRoute?.expectedTimeToFinish,
        },
        {
            label: 'Distance crawled',
            value: `${crawlRoute?.distance.toFixed(2)} km`,
        },
    ];

    return (
        <Surface style={styles.surface} elevation={3}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Avatar.Image source={user.avatar} size={48} />
                    <View style={styles.headerTitle}>
                        <Text variant="titleSmall">{user.name}</Text>
                        <Text variant="bodySmall" style={styles.headerSubtitle}>
                            {created.toLocaleDateString()} | {location}
                        </Text>
                    </View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={handleMenuDismiss}
                        anchor={<IconButton icon="dots-vertical" onPress={handleDotsPress} />}
                    >
                        <Menu.Item title="Add to favorites" onPress={() => {}} />
                        <Menu.Item title="Set notifications" onPress={() => {}} />
                        <Divider />
                        <Menu.Item title="Block" onPress={() => {}} />
                    </Menu>
                </View>
                <Text variant="titleLarge" style={styles.title}>
                    {name}
                </Text>
                <StatsTable stats={stats} columns={3} topBottomDividers={false} size="small" />
                <View style={{ height: 200 }}>
                    {crawlRoute && <RouteMapView venues={crawlRoute.venues} style={styles.mapView} />}
                </View>
                <View style={styles.participants}>
                    <Text style={styles.participantsLabel}>With</Text>
                    {participants
                        .filter((p) => p.guid !== user.guid)
                        .map((p, idx) => (
                            <Avatar.Image key={idx} source={p.avatar} size={24} style={styles.participantAvatar} />
                        ))}
                </View>
            </View>
        </Surface>
    );
};
export default PostCrawlItem;

const styles = StyleSheet.create({
    surface: {
        paddingVertical: 8,
        marginBottom: 24,
    },
    container: {},
    header: {
        flexDirection: 'row',
        marginBottom: 8,
        marginHorizontal: 8,
    },
    headerTitle: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'center',
    },
    headerSubtitle: {
        opacity: 0.5,
        marginTop: 4,
    },
    title: {
        marginHorizontal: 8,
    },
    mapView: {
        height: 200,
        width: '100%',
    },
    participants: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    participantsLabel: {
        opacity: 0.5,
        marginRight: 4,
    },
    participantAvatar: {
        marginHorizontal: 2,
    },
});
