import { User } from './user';
import { Venue } from './venue';

export interface CrawlRoute {
    guid: string;
    createdBy: User;
    createdOn: Date;
    name: string;
    favorite: boolean;
    finishedBy: number;
    expectedTimeToFinish: string;
    distance: number;
    venues: Venue[];
}
