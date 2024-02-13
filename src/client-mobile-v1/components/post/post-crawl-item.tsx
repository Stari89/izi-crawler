import { Text } from 'react-native-paper';
import { PostCrawl } from '../../models';

interface PostCrawlItemProps {
    post: PostCrawl;
}
const PostCrawlItem = (props: PostCrawlItemProps) => {
    const { post } = props;
    return <Text>Crawl Post</Text>;
};
export default PostCrawlItem;
