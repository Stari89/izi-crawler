import { ReactNode, createContext, useEffect, useState } from 'react';
import { Post } from '../models';
import { FEED } from '../data/dummy-data';

interface FeedContextValue {
    feed: Post[];
}
export const FeedContext = createContext<FeedContextValue | null>(null);

interface FeedProviderProps {
    children: ReactNode;
}
export const FeedProvider = (props: FeedProviderProps) => {
    const { children } = props;

    const [feed, setFeed] = useState<Post[]>([]);

    useEffect(() => {
        const posts = FEED;
        setFeed(posts);
    }, []);

    const contextValue: FeedContextValue = {
        feed,
    };

    return <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>;
};
