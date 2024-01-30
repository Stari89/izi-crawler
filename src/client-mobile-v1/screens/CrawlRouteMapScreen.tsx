import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { useForegroundPermissions, PermissionStatus, getCurrentPositionAsync } from 'expo-location';

const CrawlRouteMapScreen = () => {
    const theme = useTheme();
    const [locationPermission, requestLocationPermission] = useForegroundPermissions();

    const [region, setRegion] = useState<Region>();

    const verifyPermission = async () => {
        console.log('1', locationPermission);

        if (
            !locationPermission ||
            (locationPermission.status !== PermissionStatus.GRANTED && locationPermission.canAskAgain)
        ) {
            const permissionResponse = await requestLocationPermission();
            return permissionResponse.granted;
        }

        if (locationPermission?.status === PermissionStatus.DENIED) {
            Alert.alert('No Location Permissions!', 'You need to grant location permissions to use this feature.');
            return false;
        }

        return true;
    };

    const getLocation = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    if (!region) {
        return null;
    }

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <MapView style={styles.mapView} region={region}>
                <Marker title="You're here" coordinate={region} />
            </MapView>
        </View>
    );
};

export default CrawlRouteMapScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    mapView: {
        flex: 1,
    },
});
