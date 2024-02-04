import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Venue } from '../../models';
import VenueItem from './VenueItem';

interface VenuesListProps {
    venueItems: Venue[];
    onVenuePress?: (venue: Venue) => void;
}
const VenuesList = (props: VenuesListProps) => {
    const { venueItems, onVenuePress } = props;

    const handleVenuePress = (venue: Venue) => {
        onVenuePress && onVenuePress(venue);
    };

    const renderItem = ({ item }: { item: Venue }) => <VenueItem venue={item} onPress={handleVenuePress} />;

    if (!venueItems.length) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.noItemsContainer}>
                    <Text>No venues ...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList data={venueItems} keyExtractor={(i) => i.guid} renderItem={renderItem} />
        </View>
    );
};

export default VenuesList;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    noItemsContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
});
