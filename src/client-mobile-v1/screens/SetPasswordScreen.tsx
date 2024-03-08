import { useTheme, Text, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { useApi } from '../hooks';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthResetPasswordDto } from '../api-client';
import { ScrollView, StyleSheet } from 'react-native';

const SetPasswordScreen = () => {
    const theme = useTheme();
    const { authApi } = useApi();
    const { control, formState, handleSubmit, watch } = useForm<AuthResetPasswordDto>();

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmitform = async (data: AuthResetPasswordDto) => {};

    const handlePasswordVisibleToggle = () => {
        setPasswordVisible((curr) => !curr);
    };

    return (
        <ScrollView style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.headline} variant="headlineMedium">
                Create an Account
            </Text>
            <Controller
                control={control}
                defaultValue=""
                name="password"
                rules={{
                    required: 'Password is required.',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long.',
                    },
                    maxLength: {
                        value: 50,
                        message: 'Password must not exceed 50 characters.',
                    },
                    validate: {
                        oneUpper: (value) =>
                            /[A-Z]/.test(value) || 'Password must contain a least one uppercase letter.',
                        oneLower: (value) =>
                            /[a-z]/.test(value) || 'Password must contain a least one lowercase letter.',
                        oneNumber: (value) => /\d/.test(value) || 'Password must contain a least one number.',
                        oneSpecial: (value) =>
                            /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/.test(value) ||
                            'Password must contain a least one special character.',
                    },
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
            <Controller
                control={control}
                defaultValue=""
                name="confirmPassword"
                rules={{
                    validate: {
                        isEqual: (value) => value === watch('password') || 'Passwords must match.',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="password"
                            style={styles.textInput}
                            label="Repeat Password"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            secureTextEntry={!passwordVisible}
                            error={!!formState.errors.confirmPassword}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? 'eye-off' : 'eye'}
                                    onPress={handlePasswordVisibleToggle}
                                />
                            }
                        />
                        {formState.errors.confirmPassword && (
                            <HelperText type="error">{formState.errors.confirmPassword.message}</HelperText>
                        )}
                    </>
                )}
            />
            <Snackbar visible={snackBarVisible} onDismiss={() => setSnackBarVisible(false)} wrapperStyle={{ top: 0 }}>
                {snackBarText}
            </Snackbar>
        </ScrollView>
    );
};

export default SetPasswordScreen;

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
