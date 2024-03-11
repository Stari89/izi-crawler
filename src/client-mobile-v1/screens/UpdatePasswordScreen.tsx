import { useTheme, Text, TextInput, HelperText, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthUpdatePasswordDto } from '../api-client';
import { ScrollView, StyleSheet } from 'react-native';

const UpdatePasswordScreen = () => {
    const theme = useTheme();
    const { updatePassword } = useAuth();
    const { control, formState, handleSubmit, watch, setError } = useForm<AuthUpdatePasswordDto>();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data: AuthUpdatePasswordDto) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        await updatePassword(data, setError);
        setIsLoading(false);
    };

    const handlePasswordVisibleToggle = () => {
        setPasswordVisible((curr) => !curr);
    };

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <Text style={styles.headline} variant="headlineMedium">
                Update your password
            </Text>
            <Controller
                control={control}
                defaultValue=""
                name="oldPassword"
                rules={{
                    required: 'Old password is required.',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="password"
                            style={styles.textInput}
                            label="Old Password"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            secureTextEntry={!passwordVisible}
                            error={!!formState.errors.oldPassword}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? 'eye-off' : 'eye'}
                                    onPress={handlePasswordVisibleToggle}
                                />
                            }
                        />
                        {formState.errors.oldPassword && (
                            <HelperText type="error">{formState.errors.oldPassword.message}</HelperText>
                        )}
                    </>
                )}
            />
            <Divider style={styles.divider} />
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
                            label="New Password"
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
            <Button style={styles.submitButton} mode="contained" onPress={handleSubmit(handleSubmitForm)}>
                {(isLoading && <ActivityIndicator color={theme.colors.onPrimary} size={20} />) || 'Set New Password'}
            </Button>
        </ScrollView>
    );
};

export default UpdatePasswordScreen;

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
    divider: {
        marginVertical: 16,
    },
    submitButton: {
        marginVertical: 8,
    },
    continueWithButton: {
        marginVertical: 4,
    },
});
