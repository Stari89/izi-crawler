import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Venue } from '../../models';
import VenueItem from './VenueItem';

interface VenuesListProps {
    venueItems: Venue[];
}
const VenuesList = (props: VenuesListProps) => {
    const { venueItems } = props;

    const renderItem = ({ item }: { item: Venue }) => <VenueItem venue={item} />;

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
