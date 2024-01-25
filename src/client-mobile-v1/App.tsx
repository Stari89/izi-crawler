import { StatusBar } from 'expo-status-bar';
import { MD3Theme, PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen, WelcomeScreen } from './screens';
import { Platform, useColorScheme } from 'react-native';
import Constants from 'expo-constants';
import { DARK_THEME, LIGHT_THEME } from './constants';

const Stack = createNativeStackNavigator();

const App = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
    return (
        <PaperProvider theme={theme}>
            <AppContent />
        </PaperProvider>
    );
};
export default App;

const AppContent = () => {
    const theme = useTheme();
    return (
        <>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.colors.background },
                        headerTintColor: theme.colors.onBackground,
                        headerShown: false,
                        contentStyle: { paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight },
                    }}
                >
                    <Stack.Screen name="welcome" component={WelcomeScreen} />
                    <Stack.Screen name="login" component={LoginScreen} />
                    <Stack.Screen name="signup" component={SignupScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};
