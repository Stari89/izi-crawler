import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginScreen, SignupScreen, WelcomeScreen } from '../screens';
import { NAVIGATION_NAMES } from '../constants/navigation-names';

const Stack = createNativeStackNavigator();

const PublicNavigator = () => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerTintColor: theme.colors.onBackground,
                headerShown: false,
                contentStyle: { paddingTop: insets.top },
            }}
        >
            <Stack.Screen name={NAVIGATION_NAMES.welcome} component={WelcomeScreen} />
            <Stack.Screen name={NAVIGATION_NAMES.login} component={LoginScreen} />
            <Stack.Screen name={NAVIGATION_NAMES.signup} component={SignupScreen} />
        </Stack.Navigator>
    );
};

export default PublicNavigator;
