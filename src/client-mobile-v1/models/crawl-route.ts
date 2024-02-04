import { User } from './user';
import { Venue } from './venue';

export interface CrawlRoute {
    guid: string;
    createdBy: User;
    createdOn: Date;
    name: string;
    favorite: boolean;
    finishedBy: number;
    destinationCount: number;
    venues: Venue[];
}
