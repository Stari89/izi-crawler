import { StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, TextInput, HelperText, Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../hooks';
import { Controller, useForm } from 'react-hook-form';
import { AuthConfirmDto } from '../api-client';
import { useState } from 'react';

const ConfirmationCodeScreen = () => {
    const theme = useTheme();
    const { emailToConfirm, confirmEmail } = useAuth();
    const { control, formState, handleSubmit } = useForm<AuthConfirmDto>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data: AuthConfirmDto) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        await confirmEmail(data);
        setIsLoading(false);
    };

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <Text style={styles.headline} variant="headlineMedium">
                Confirm your email
            </Text>
            <Text style={styles.text} variant="bodyMedium">
                Let us know this email belongs to you. Enter the code in the email sent to {emailToConfirm}.
            </Text>
            <Controller
                control={control}
                defaultValue=""
                name="confirmationCode"
                rules={{
                    required: 'Confirmation code is required.',
                    pattern: {
                        value: /^\d{5}$/,
                        message: 'Confirmation code must be 5 numbers.',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.textInput}
                            label="Confirmation code"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            error={!!formState.errors.confirmationCode}
                            keyboardType="numeric"
                        />
                        {formState.errors.confirmationCode && (
                            <HelperText type="error">{formState.errors.confirmationCode.message}</HelperText>
                        )}
                    </>
                )}
            />
            <Button style={styles.submitButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
                {(isLoading && <ActivityIndicator color={theme.colors.onPrimary} size={20} />) || 'Confirm Email'}
            </Button>
        </ScrollView>
    );
};

export default ConfirmationCodeScreen;

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
    divider: {
        marginVertical: 32,
    },
    continueWithButton: {
        marginVertical: 4,
    },
});
