import { View, Image, Pressable, ViewStyle, StyleSheet } from 'react-native';
import { Venue } from '../../models';
import { Text, useTheme } from 'react-native-paper';
import { LatLng, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getMapPreviewUri } from '../../util/maps-static-api';

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
        <Pressable onPress={handleMapPress} style={style}>
            <Image
                style={styles.map}
                source={{ uri: getMapPreviewUri(venues, theme.colors.secondary, showVenueMarkers, markerPosition) }}
            />
        </Pressable>
    );
};

export default RouteMapView;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
