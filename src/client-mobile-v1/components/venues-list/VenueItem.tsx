import { StyleSheet, View } from 'react-native';
import { Venue } from '../../models';
import { Card, useTheme, Text, Paragraph, IconButton } from 'react-native-paper';

interface VenueItemProps {
    venue: Venue;
}
const VenueItem = (props: VenueItemProps) => {
    const theme = useTheme();
    const { venue } = props;

    return (
        <View style={[styles.rootContainer]}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.cardContentView}>
                        <Text style={styles.headline} variant="headlineSmall">
                            {venue.sortOrder}
                        </Text>
                        <View style={styles.info}>
                            <Text variant="titleMedium">{venue.name}</Text>
                            <Paragraph style={styles.address}>
                                <Text variant="bodySmall">{venue.address}</Text>
                            </Paragraph>
                        </View>
                        <IconButton
                            style={[styles.iconButton, styles.dragIconButton]}
                            icon="drag-vertical"
                            iconColor={theme.colors.secondary}
                        />
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

export default VenueItem;

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
    headline: {
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    address: {
        opacity: 0.5,
    },
    iconButton: {
        margin: 0,
    },
    dragIconButton: {
        marginLeft: 8,
    },
});
