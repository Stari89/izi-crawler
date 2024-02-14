import { Text } from 'react-native-paper';
import { PostChallenge } from '../../models';

interface PostChallengeItemProps {
    post: PostChallenge;
}
const PostChallengeItem = (props: PostChallengeItemProps) => {
    const { post } = props;
    return <Text>Challenge Post</Text>;
};
export default PostChallengeItem;
