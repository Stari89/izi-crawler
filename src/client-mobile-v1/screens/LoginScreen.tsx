import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';

const LoginScreen = () => {
    const theme = useTheme();

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headline} variant="headlineMedium">
                Log in to Izi Crawler
            </Text>
            <TextInput style={styles.textInput} label="Email" mode="outlined" />
            <TextInput style={styles.textInput} label="Password" mode="outlined" secureTextEntry />
            <View style={styles.forgotPasswordContainer}>
                <Button>Forgot Password?</Button>
            </View>
            <Button mode="contained">Log In</Button>
            <Divider style={styles.divider} />
            <Button style={styles.continueWithButton} mode="outlined" icon="google">
                Continue with Google
            </Button>
            <Button style={styles.continueWithButton} mode="outlined" icon="facebook">
                Continue with Facebook
            </Button>
            <Button style={styles.continueWithButton} mode="outlined" icon="apple">
                Continue with Apple
            </Button>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headline: {
        marginVertical: 32,
    },
    textInput: {
        marginVertical: 4,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-start',
        marginTop: 4,
        marginBottom: 8,
    },
    loginButton: {
        marginVertical: 8,
    },
    divider: {
        marginVertical: 32,
    },
    continueWithButton: {
        marginVertical: 4,
    },
});
