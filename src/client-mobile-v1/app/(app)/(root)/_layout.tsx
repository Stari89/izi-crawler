import { Redirect, Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { composeAppTitle } from '../../../util/screen-title';
import { useAuth } from '../../../hooks';

const AppLayout = () => {
    const theme = useTheme();
    const { isAuthenticated } = useAuth();
    const insets = useSafeAreaInsets();

    if (!isAuthenticated) {
        return <Redirect href="/welcome" />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.onPrimary,
                headerShown: true,
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: { paddingTop: insets.top } }} />
            <Stack.Screen name="route/[guid]/map" options={{ headerTitle: 'Map', title: composeAppTitle('Map') }} />
            <Stack.Screen name="settings" options={{ headerTitle: 'Settings', title: composeAppTitle('Settings') }} />
            <Stack.Screen
                name="update-password"
                options={{ headerTitle: 'Update Password', title: composeAppTitle('Update Password') }}
            />
        </Stack>
    );
};

export default AppLayout;
