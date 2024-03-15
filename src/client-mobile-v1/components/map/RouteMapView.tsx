import { View, ViewStyle } from 'react-native';
import { Venue } from '../../models';
import { Text, useTheme } from 'react-native-paper';
import { LatLng, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { MapView, Marker, Polyline } from '../../util/maps';
import Constants from 'expo-constants';

interface RouteMapViewProps {
    venues: Venue[];
    markerPosition?: LatLng;
    showVenueMarkers?: boolean;
    style?: ViewStyle;
    onPress?: () => void;
}
const RouteMapView = (props: RouteMapViewProps) => {
    const theme = useTheme();
    const { venues, markerPosition, showVenueMarkers = false, style, onPress } = props;
    const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
    const [region, setRegion] = useState<Region>();

    const handleMapPress = () => {
        onPress && onPress();
    };

    useEffect(() => {
        const latList = venues.map((v) => v.location.latitude);
        const lngList = venues.map((v) => v.location.longitude);
        const latMin = Math.min(...latList);
        const latMax = Math.max(...latList);
        const lngMin = Math.min(...lngList);
        const lngMax = Math.max(...lngList);

        const region: Region = {
            latitude: (latMin + latMax) / 2,
            longitude: (lngMin + lngMax) / 2,
            latitudeDelta: (latMax - latMin) * 1.5,
            longitudeDelta: (lngMax - lngMin) * 1.5,
        };
        setRegion(region);
    }, []);

    if (!venues.length || !region) {
        return (
            <View style={[style]}>
                <Text>No data for map!</Text>
            </View>
        );
    }

    return (
        <MapView
            style={style}
            region={region}
            onPress={handleMapPress}
            provider="google"
            // @ts-ignore
            googleMapsApiKey={apiKey}
        >
            {markerPosition && <Marker coordinate={markerPosition} />}
            {showVenueMarkers && venues.map((v) => <Marker key={v.guid} coordinate={v.location} />)}
            <Polyline
                coordinates={venues.map((v) => v.location)}
                strokeWidth={2.5}
                strokeColor={theme.colors.secondary}
                lineDashPattern={[0, 5]}
            />
        </MapView>
    );
};

export default RouteMapView;
