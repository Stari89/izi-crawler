import { View, StyleSheet } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks/use-auth';

const SignupScreen = () => {
    const theme = useTheme();
    const { login } = useAuth();

    const handleSignupPress = () => {
        login();
    };

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headline} variant="headlineMedium">
                Create an Account
            </Text>
            <TextInput style={styles.textInput} label="Email" mode="outlined" />
            <TextInput style={styles.textInput} label="Password" mode="outlined" secureTextEntry />
            <HelperText type="info">Password must contain at least 8 characters.</HelperText>
            <Button style={styles.signupButton} mode="contained" onPress={handleSignupPress}>
                Sign Up
            </Button>
            <HelperText type="info">By continuing you agree to Terms and Conditions.</HelperText>
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

export default SignupScreen;

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
    signupButton: {
        marginVertical: 8,
    },
    divider: {
        marginVertical: 32,
    },
    continueWithButton: {
        marginVertical: 4,
    },
});
