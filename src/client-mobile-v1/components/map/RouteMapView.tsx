import { ViewStyle } from 'react-native';
import { Venue } from '../../models';
import { Text } from 'react-native-paper';
import { LatLng } from 'react-native-maps';

interface RouteMapViewProps {
    venues: Venue[];
    markerPosition?: LatLng;
    showVenueMarkers?: boolean;
    style?: ViewStyle;
    onPress?: () => void;
}
const RouteMapView = (props: RouteMapViewProps) => {
    return <Text>No mapView yet on the web platform!!!</Text>;
};

export default RouteMapView;
