import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppLayout = () => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.onPrimary,
                contentStyle: { paddingTop: insets.top },
                statusBarColor: theme.colors.primary,
            }}
        >
            <Stack.Screen name="(root)" options={{ contentStyle: { paddingTop: 0 } }} />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="confirmation-code" />
            <Stack.Screen name="set-password" />
        </Stack>
    );
};

export default AppLayout;
