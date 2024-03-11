import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Button, Icon } from 'react-native-paper';
import { NAVIGATION_ROUTES } from '../../constants/navigation-routes';
import { useAuth } from '../../hooks';

const AuthSuccessScreen = () => {
    const theme = useTheme();
    const { mode } = useAuth();

    const handleContinuePress = () => {
        router.replace(NAVIGATION_ROUTES.login);
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.innerContainer}>
                <Text style={styles.headline} variant="displayLarge">
                    Success!
                </Text>
                <Text style={styles.message} variant="bodyMedium">
                    {mode === 'create' ? 'Your account has been created.' : 'Your password was reset.'}
                </Text>
                <View style={styles.checkIcon}>
                    <Icon color={theme.colors.secondary} size={256} source="check-decagram" />
                </View>
                <Button style={styles.continueButton} mode="contained" onPress={handleContinuePress}>
                    Continue
                </Button>
            </View>
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
    innerContainer: {
        alignSelf: 'center',
        maxWidth: 800,
        width: '100%',
        flex: 1,
    },
    headline: {
        textAlign: 'center',
        marginVertical: 32,
    },
    message: {
        textAlign: 'center',
    },
    checkIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButton: {
        marginVertical: 32,
    },
});
