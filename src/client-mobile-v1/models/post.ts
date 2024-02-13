import { CrawlRoute } from './crawl-route';
import { User } from './user';

export type Post = {
    guid: string;
    type: PostType;
};

export enum PostType {
    Crawl,
    FollowerSuggestion,
    Challenge,
}

export interface PostCrawl extends Post {
    user: User;
    name: string;
    location: string;
    created: Date;
    crawlRoute?: CrawlRoute;
}

export interface PostFollowerSuggestion extends Post {
    users: User[];
    reason: FollowerSuggestionReason;
}

export enum FollowerSuggestionReason {
    CrawledTogether = 'You were in the same crawl.',
    MutualFollowers = 'You have mutual followers.',
    Contacts = 'You have their contact on your phone.',
}

export interface PostChallenge extends Post {
    crawlRoute: CrawlRoute;
}
