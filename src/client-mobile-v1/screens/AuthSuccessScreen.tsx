import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Button, Icon } from 'react-native-paper';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';

const AuthSuccessScreen = () => {
    const theme = useTheme();

    const handleContinuePress = () => {
        router.replace(NAVIGATION_ROUTES.login);
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headline} variant="displayLarge">
                Success!
            </Text>
            <Text style={styles.message} variant="bodyMedium">
                Your account has been created.
            </Text>
            <View style={styles.checkIcon}>
                <Icon color={theme.colors.secondary} size={256} source="check-decagram" />
            </View>
            <Button style={styles.continueButton} mode="contained" onPress={handleContinuePress}>
                Continue
            </Button>
        </View>
    );
};

export default AuthSuccessScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    headline: {
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        marginVertical: 32,
    },
    checkIcon: {
        alignItems: 'center',
        marginVertical: 64,
    },
    continueButton: {
        marginVertical: 32,
    },
});
