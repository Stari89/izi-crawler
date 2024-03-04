import { StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks/use-auth';
import { Controller, useForm } from 'react-hook-form';
import { useApi } from '../hooks';

type FormData = {
    email: string;
    password: string;
};

const LoginScreen = () => {
    const theme = useTheme();
    const { login } = useAuth();

    const { authApi } = useApi();

    const { control, clearErrors, formState, handleSubmit } = useForm<FormData>();

    const handleSubmitForm = async (data: FormData) => {
        try {
            const response = await authApi.signIn(data);
            console.log(response);
        } catch (err) {
            console.log(err);
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
