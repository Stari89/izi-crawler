import { StyleSheet, View } from 'react-native';
import { CrawlRoute } from '../../models';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

interface CrawlRouteItemProps {
    crawlRoute: CrawlRoute;
}

const CrawlRouteItem = (props: CrawlRouteItemProps) => {
    const theme = useTheme();
    const { crawlRoute } = props;

    const handleOptionsPress = () => {};

    return (
        <View style={[styles.rootContainer]}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.cardContentView}>
                        <IconButton
                            style={styles.iconButton}
                            icon={crawlRoute.favorite ? 'star' : 'star-outline'}
                            iconColor={theme.colors.secondary}
                        />
                        <View style={styles.info}>
                            <Text>{crawlRoute.name}</Text>
                            <Text variant="bodySmall">Created: 20.11.2024</Text>
                        </View>
                        <IconButton style={styles.iconButton} icon="dots-vertical" onPress={handleOptionsPress} />
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

export default CrawlRouteItem;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    card: {
        margin: 4,
    },
    cardContentView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 8,
    },
    info: {
        flex: 1,
    },
    iconButton: {
        margin: 0,
    },
});
