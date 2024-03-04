import { Alert, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useApi } from '../hooks';
import { ResponseError } from '../api-client';
import { useState } from 'react';

type FormData = {
    email: string;
    password: string;
};

const LoginScreen = () => {
    const theme = useTheme();
    const { authApi } = useApi();
    const { control, formState, handleSubmit } = useForm<FormData>();

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

    const handleSubmitForm = async (data: FormData) => {
        try {
            const response = await authApi.signIn(data);
            console.log(response);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            setSnackBarText('Malformed input (TODO)');
                            setSnackBarVisible(true);
                            break;
                        case 401:
                            setSnackBarText('Incorrect email or password.');
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
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headline} variant="headlineMedium">
                Log in to Izi Crawler
            </Text>

            <Controller
                control={control}
                defaultValue=""
                name="email"
                rules={{ required: true }}
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
                        {formState.errors.email && <HelperText type="error">Error</HelperText>}
                    </>
                )}
            />

            <Controller
                control={control}
                defaultValue=""
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="password"
                            style={styles.textInput}
                            label="Password"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            secureTextEntry
                            error={!!formState.errors.password}
                        />
                        {formState.errors.password && <HelperText type="error">Error</HelperText>}
                    </>
                )}
            />

            <View style={styles.forgotPasswordContainer}>
                <Button>Forgot Password?</Button>
            </View>
            <Button style={styles.loginButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
                Log In
            </Button>
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
            <Snackbar visible={snackBarVisible} onDismiss={() => setSnackBarVisible(false)}>
                {snackBarText}
            </Snackbar>
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
