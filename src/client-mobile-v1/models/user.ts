import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';

export interface User {
    guid: string;
    name: string;
    initials: string;
    avatar: AvatarImageSource;
}
