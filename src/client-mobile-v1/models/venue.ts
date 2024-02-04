import { LatLng } from 'react-native-maps';

export interface Venue {
    guid: string;
    name: string;
    sortOrder: number;
    address: string;
    location: LatLng;
}
