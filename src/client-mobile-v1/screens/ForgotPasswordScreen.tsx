import { StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks';
import { Controller, useForm } from 'react-hook-form';
import { AuthEmailDto } from '../api-client';
import { useState } from 'react';

const ForgotPasswordScreen = () => {
    const theme = useTheme();
    const { forgotPassword } = useAuth();
    const { control, formState, handleSubmit, setError } = useForm<AuthEmailDto>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data: AuthEmailDto) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        await forgotPassword(data, setError);
        setIsLoading(false);
    };

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <Text style={styles.headline} variant="headlineMedium">
                Forgot password
            </Text>
            <Text style={styles.text} variant="bodyMedium">
                We will send a confirmation code to your email and then you will be able to change your password.
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
                {(isLoading && <ActivityIndicator color={theme.colors.onPrimary} size={20} />) || 'Reset Password'}
            </Button>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;

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
    text: {
        marginBottom: 32,
    },
    textInput: {
        marginVertical: 4,
    },
    submitButton: {
        marginVertical: 8,
    },
});
