import { StyleSheet, ScrollView } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth, useSnack } from '../hooks';
import { Controller, useForm } from 'react-hook-form';
import { AuthEmailDto, ResponseError } from '../api-client';

const ForgotPasswordScreen = () => {
    const theme = useTheme();
    const { forgotPassword } = useAuth();
    const { pushSnack } = useSnack();
    const { control, formState, handleSubmit } = useForm<AuthEmailDto>();

    const handleSubmitForm = async (data: AuthEmailDto) => {
        try {
            await forgotPassword(data);
        } catch (err: any) {
            switch (err.constructor) {
                case ResponseError:
                    switch ((err as ResponseError).response.status) {
                        case 400:
                            pushSnack('Malformed input (TODO).');
                            break;
                        case 401:
                            pushSnack('Email is not registered.');
                            break;
                        default:
                            pushSnack('Something went wrong.');
                            break;
                    }
                    break;
                default:
                    pushSnack('Something went wrong.');
                    break;
            }
        }
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

            <Button style={styles.signupButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
                Reset password
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
    signupButton: {
        marginVertical: 8,
    },
});
