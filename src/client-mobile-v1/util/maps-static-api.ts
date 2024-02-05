import { LatLng } from 'react-native-maps';
import { Venue } from '../models';
import Constants from 'expo-constants';

export const getMapPreviewUri = (venues: Venue[], color: string, drawMarkers: boolean, additionalMarker?: LatLng) => {
    const googleMapsApiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
    const points = venues.map((v) => `${v.location.latitude},${v.location.longitude}`).join('|');
    const path = `&path=color:${color.replace('#', '0x')}|weight:3|${points}`;
    const markers = drawMarkers
        ? `&markers=${points}`
        : additionalMarker
        ? `&markers=${additionalMarker.latitude},${additionalMarker.longitude}`
        : '';
    const url = `https://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&${path}${markers}&size=640x640&scale=2&key=${googleMapsApiKey}`;
    return url;
};
