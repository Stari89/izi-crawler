import { Post, PostChallenge, PostCrawl, PostFollowerSuggestion, PostType } from '../../models';
import { PostChallengeItem, PostCrawlItem, PostFollowerSuggestionItem } from '../post';

interface FeedItemProps {
    post: Post;
}
const FeedItem = (props: FeedItemProps) => {
    const { post } = props;
    switch (post.type) {
        case PostType.Crawl:
            return <PostCrawlItem post={post as PostCrawl} />;
        case PostType.FollowerSuggestion:
            return <PostFollowerSuggestionItem post={post as PostFollowerSuggestion} />;
        case PostType.Challenge:
            return <PostChallengeItem post={post as PostChallenge} />;
        default:
            return null;
    }
};

export default FeedItem;
