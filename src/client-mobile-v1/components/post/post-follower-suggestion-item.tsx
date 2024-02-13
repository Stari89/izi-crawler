import { Text } from 'react-native-paper';
import { PostFollowerSuggestion } from '../../models';

interface PostFollowerSuggestionItemProps {
    post: PostFollowerSuggestion;
}
const PostFollowerSuggestionItem = (props: PostFollowerSuggestionItemProps) => {
    const { post } = props;
    return <Text>Follower Suggestion Post</Text>;
};
export default PostFollowerSuggestionItem;
