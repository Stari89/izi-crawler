import { Avatar, Button, Divider, Surface, Text, useTheme } from 'react-native-paper';
import { PostChallenge } from '../../models';
import { StyleSheet, View } from 'react-native';

interface PostChallengeItemProps {
    post: PostChallenge;
}
const PostChallengeItem = (props: PostChallengeItemProps) => {
    const { post } = props;
    const { crawlRoute, followingFinished } = post;

    const theme = useTheme();

    return (
        <Surface style={styles.surface} elevation={3}>
            <Text style={styles.followingFinished}>
                {followingFinished.map((ff) => ff.name).join(', ')} and {crawlRoute.finishedBy} others finished this
                challenge.
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.challengeContainer}>
                <Avatar.Image source={crawlRoute.createdBy.avatar} size={96} />
                <View style={styles.challengeView}>
                    <Text variant="titleLarge">{crawlRoute.name} Challenge</Text>
                    <Text variant="bodySmall" style={styles.createdBy}>
                        Created by {crawlRoute.createdBy.name}
                    </Text>
                    <Text variant="bodyMedium" style={styles.taunt}>
                        Can you crawl this {crawlRoute.venues.length} venue route in under{' '}
                        {crawlRoute.expectedTimeToFinish}?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button buttonColor={theme.colors.secondary} mode="contained">
                            Join Challenge
                        </Button>
                    </View>
                </View>
            </View>
        </Surface>
    );
};
export default PostChallengeItem;

const styles = StyleSheet.create({
    surface: {
        paddingVertical: 8,
        marginBottom: 24,
    },
    followingFinished: {
        marginHorizontal: 8,
        opacity: 0.75,
    },
    divider: {
        marginVertical: 16,
        marginHorizontal: 8,
    },
    challengeContainer: {
        margin: 8,
        flexDirection: 'row',
    },
    challengeView: {
        flex: 1,
        marginLeft: 8,
    },
    createdBy: {
        opacity: 0.75,
        marginBottom: 16,
    },
    taunt: {
        marginBottom: 32,
    },
    buttonContainer: {
        alignItems: 'flex-start',
    },
});
