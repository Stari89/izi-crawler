import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { CrawlRoute } from '../models';
import CrawlRoutesList from '../components/crawl-routes-list/CrawlRoutesList';
import { useCrawlRoute } from '../hooks';

interface CrawlRouteScreenProps {
    crawlRoutesFilter: 'my-routes' | 'favorite-routes';
}
const CrawlRoutesScreen = (props: CrawlRouteScreenProps) => {
    const theme = useTheme();
    const { crawlRoutesFilter } = props;

    const { myRoutes, favoriteRoutes } = useCrawlRoute();

    const [crawlRoutes, setCrawlRoutes] = useState<CrawlRoute[]>([]);
    const [filteredCrawlRoutes, setFilteredCrawlRoutes] = useState<CrawlRoute[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchedCrawlRoutes = crawlRoutesFilter === 'my-routes' ? myRoutes : favoriteRoutes;
        setCrawlRoutes(fetchedCrawlRoutes);
    }, []);

    const handleClearSearchPress = () => {
        setSearchText('');
    };

    useEffect(() => {
        const filteredCrawlRoutes = crawlRoutes.filter(
            (route) =>
                route.name.toLowerCase().includes(searchText.toLowerCase()) ||
                route.createdBy.name.toLowerCase().includes(searchText.toLocaleLowerCase()),
        );
        setFilteredCrawlRoutes(filteredCrawlRoutes);
    }, [searchText, crawlRoutes]);

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <TextInput
                style={styles.searchTextInput}
                mode="outlined"
                label="Search"
                value={searchText}
                onChangeText={setSearchText}
                right={<TextInput.Icon icon={searchText ? 'close' : 'magnify'} onPress={handleClearSearchPress} />}
            />
            <CrawlRoutesList crawlRouteItems={filteredCrawlRoutes} />
        </View>
    );
};

export default CrawlRoutesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    searchTextInput: {
        marginVertical: 8,
        marginHorizontal: 8,
    },
});
