import { User } from './user';

export interface Route {
    guid: string;
    createdBy: User;
    createdOn: Date;
    name: string;
    favorite: boolean;
}
