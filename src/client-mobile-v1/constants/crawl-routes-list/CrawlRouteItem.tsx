import { View } from 'react-native';
import { CrawlRoute } from '../../models';
import { Text } from 'react-native-paper';

interface CrawlRouteItemProps {
    crawlRoute: CrawlRoute;
}

const CrawlRouteItem = (props: CrawlRouteItemProps) => {
    const { crawlRoute } = props;

    return (
        <View>
            <Text>{crawlRoute.name}</Text>
        </View>
    );
};

export default CrawlRouteItem;
