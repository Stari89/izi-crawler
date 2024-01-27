import { User } from './user';

export interface CrawlRoute {
    guid: string;
    createdBy: User;
    createdOn: Date;
    name: string;
    favorite: boolean;
}
