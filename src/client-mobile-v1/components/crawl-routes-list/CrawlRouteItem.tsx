import { StyleSheet, View } from 'react-native';
import { CrawlRoute } from '../../models';
import { Card, IconButton, Paragraph, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { NAVIGATION_ROUTES } from '../../constants/navigation-routes';

interface CrawlRouteItemProps {
    crawlRoute: CrawlRoute;
}

const CrawlRouteItem = (props: CrawlRouteItemProps) => {
    const theme = useTheme();
    const { crawlRoute } = props;

    const handleCardPress = () => {
        router.navigate(NAVIGATION_ROUTES.route.replace('[guid]', crawlRoute.guid));
    };

    const finishedByText = crawlRoute.finishedBy
        ? crawlRoute.finishedBy > 1
            ? `${crawlRoute.finishedBy} people finished`
            : '1 person finished'
        : 'Nobody finished yet';

    return (
        <View style={[styles.rootContainer]}>
            <Card style={styles.card} onPress={handleCardPress}>
                <Card.Content>
                    <View style={styles.cardContentView}>
                        <IconButton
                            style={[styles.iconButton, styles.starIconButton]}
                            icon={crawlRoute.favorite ? 'star' : 'star-outline'}
                            iconColor={theme.colors.secondary}
                        />
                        <View style={styles.info}>
                            <Text variant="titleMedium">{crawlRoute.name}</Text>
                            <Paragraph>
                                <Text>Created by </Text>
                                <Text style={styles.bold}>{crawlRoute.createdBy.name}</Text>
                                <Text> on </Text>
                                <Text style={styles.bold}>{crawlRoute.createdOn.toLocaleDateString()}</Text>
                            </Paragraph>
                            <Paragraph style={styles.finishedByParagraph}>
                                <Text variant="bodySmall">{crawlRoute.venues.length} destinations | </Text>
                                <Text variant="bodySmall">{finishedByText}</Text>
                            </Paragraph>
                        </View>
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
        marginVertical: 4,
        marginHorizontal: 8,
    },
    cardContentView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIconButton: {
        marginRight: 8,
    },
    info: {
        flex: 1,
    },
    finishedByParagraph: {
        opacity: 0.5,
    },
    iconButton: {
        margin: 0,
    },
    bold: {
        fontWeight: 'bold',
    },
});
