import { FlatList, StyleSheet, View } from 'react-native';
import { CrawlRoute } from '../../models';
import CrawlRouteItem from './CrawlRouteItem';
import { Text } from 'react-native-paper';

interface CrawlRoutesListProps {
    crawlRouteItems: CrawlRoute[];
}

const CrawlRoutesList = (props: CrawlRoutesListProps) => {
    const { crawlRouteItems } = props;

    const renderItem = ({ item }: { item: CrawlRoute }) => <CrawlRouteItem crawlRoute={item} />;

    if (!crawlRouteItems.length) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.noItemsContainer}>
                    <Text>No crawl routes ...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList data={crawlRouteItems} keyExtractor={(i) => i.guid} renderItem={renderItem} />
        </View>
    );
};

export default CrawlRoutesList;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    noItemsContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
});
