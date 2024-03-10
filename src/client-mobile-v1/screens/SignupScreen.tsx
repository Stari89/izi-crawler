import { StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks';
import { Controller, useForm } from 'react-hook-form';
import { AuthEmailDto } from '../api-client';
import { useState } from 'react';

const SignupScreen = () => {
    const theme = useTheme();
    const { signup } = useAuth();
    const { control, formState, handleSubmit, setError } = useForm<AuthEmailDto>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data: AuthEmailDto) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        await signup(data, setError);
        setIsLoading(false);
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

            <Button style={styles.submitButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
                {(isLoading && <ActivityIndicator color={theme.colors.onPrimary} size={20} />) || 'Sign Up'}
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
    submitButton: {
        marginVertical: 8,
    },
    divider: {
        marginVertical: 32,
    },
    continueWithButton: {
        marginVertical: 4,
    },
});
