import { FlatList, StyleSheet, View } from 'react-native';
import { CrawlRoute } from '../../models';
import CrawlRouteItem from './CrawlRouteItem';

interface CrawlRoutesListProps {
    crawlRouteItems: CrawlRoute[];
}

const CrawlRoutesList = (props: CrawlRoutesListProps) => {
    const { crawlRouteItems } = props;

    const renderItem = ({ item }: { item: CrawlRoute }) => <CrawlRouteItem crawlRoute={item} />;

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
});
