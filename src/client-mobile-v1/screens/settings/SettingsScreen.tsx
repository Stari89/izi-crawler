import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks';
import { router } from 'expo-router';
import { NAVIGATION_ROUTES } from '../../constants/navigation-routes';

const SettingsScreen = () => {
    const theme = useTheme();
    const { logout } = useAuth();

    const handleUpdatePasswordPress = () => {
        router.push(NAVIGATION_ROUTES.updatePassword);
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.container}>
                <Button style={styles.button} mode="outlined" onPress={handleUpdatePasswordPress}>
                    Update Password
                </Button>
                <Button style={styles.button} mode="outlined" textColor={theme.colors.error} onPress={logout}>
                    Log Out
                </Button>
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    container: {
        marginTop: 16,
        maxWidth: 800,
        width: '100%',
    },
    button: {
        marginVertical: 4,
    },
});
