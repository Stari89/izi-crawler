import { StyleSheet, ScrollView } from 'react-native';
import { Button, Divider, HelperText, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks';
import { Controller, useForm } from 'react-hook-form';
import { AuthEmailDto, ResponseError } from '../api-client';
import { useState } from 'react';

const SignupScreen = () => {
    const theme = useTheme();
    const { signup } = useAuth();
    const { control, formState, handleSubmit } = useForm<AuthEmailDto>();

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

    const handleSubmitForm = async (data: AuthEmailDto) => {
        try {
            await signup(data);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            setSnackBarText('Malformed input (TODO)');
                            setSnackBarVisible(true);
                            break;
                        case 409:
                            setSnackBarText('Email is already registered.');
                            setSnackBarVisible(true);
                            break;
                        default:
                            setSnackBarText('Something went wrong.');
                            setSnackBarVisible(true);
                            break;
                    }
                    break;
                default:
                    setSnackBarText('Something went wrong.');
                    setSnackBarVisible(true);
            }
        }
    };

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <Text style={styles.headline} variant="headlineMedium">
                Create an Account
            </Text>

            <Controller
                control={control}
                defaultValue=""
                name="email"
                rules={{
                    required: 'Email is required.',
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Invalid email.',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="email"
                            style={styles.textInput}
                            label="Email"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            error={!!formState.errors.email}
                        />
                        {formState.errors.email && (
                            <HelperText type="error">{formState.errors.email.message}</HelperText>
                        )}
                    </>
                )}
            />

            <Button style={styles.signupButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
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
            <Snackbar visible={snackBarVisible} onDismiss={() => setSnackBarVisible(false)} wrapperStyle={{ top: 0 }}>
                {snackBarText}
            </Snackbar>
        </ScrollView>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    innerContainer: {
        alignSelf: 'center',
        maxWidth: 800,
        width: '100%',
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
