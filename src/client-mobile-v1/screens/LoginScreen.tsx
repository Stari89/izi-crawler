import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { AuthSignInDto } from '../api-client';
import { useState } from 'react';
import { router } from 'expo-router';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes';

const LoginScreen = () => {
    const theme = useTheme();
    const { login } = useAuth();
    const { control, formState, handleSubmit } = useForm<AuthSignInDto>();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmitForm = async (data: AuthSignInDto) => {
        await login(data);
    };

    const handlePasswordVisibleToggle = () => {
        setPasswordVisible((curr) => !curr);
    };

    const handleForgotPasswordPress = () => {
        router.replace(NAVIGATION_ROUTES.forgotPassword);
    };

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <Text style={styles.headline} variant="headlineMedium">
                Log in to Izi Crawler
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

            <Controller
                control={control}
                defaultValue=""
                name="password"
                rules={{
                    required: 'Password is required.',
                }}
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
                            secureTextEntry={!passwordVisible}
                            error={!!formState.errors.password}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? 'eye-off' : 'eye'}
                                    onPress={handlePasswordVisibleToggle}
                                />
                            }
                        />
                        {formState.errors.password && (
                            <HelperText type="error">{formState.errors.password.message}</HelperText>
                        )}
                    </>
                )}
            />

            <View style={styles.forgotPasswordContainer}>
                <Button onPress={handleForgotPasswordPress}>Forgot Password?</Button>
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
        </ScrollView>
    );
};

export default LoginScreen;

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
