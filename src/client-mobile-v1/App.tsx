import { StatusBar } from 'expo-status-bar';
import { Icon, MD3Theme, PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    CrawlScreen,
    ExploreScreen,
    HomeScreen,
    LoginScreen,
    ProfileScreen,
    RoutesScreen,
    SignupScreen,
    WelcomeScreen,
} from './screens';
import { Platform, useColorScheme } from 'react-native';
import Constants from 'expo-constants';
import { DARK_THEME, LIGHT_THEME } from './constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './hooks/use-auth';
import { AuthProvider } from './store/auth-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const App = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </PaperProvider>
    );
};
export default App;

const SignedInNavigator = () => {
    const theme = useTheme();
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size }) => <Icon source="home" size={size} color={theme.colors.primary} />,
                    tabBarLabel: 'Home',
                }}
            />
            <BottomTab.Screen
                name="routes"
                component={RoutesScreen}
                options={{
                    tabBarIcon: ({ size }) => <Icon source="map-legend" size={size} color={theme.colors.primary} />,
                    tabBarLabel: 'Routes',
                }}
            />
            <BottomTab.Screen
                name="crawl"
                component={CrawlScreen}
                options={{
                    tabBarIcon: ({ size }) => <Icon source="beer" size={size + 8} color={theme.colors.primary} />,
                    tabBarLabel: 'Crawl',
                }}
            />
            <BottomTab.Screen
                name="explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ size }) => <Icon source="compass" size={size} color={theme.colors.primary} />,
                    tabBarLabel: 'Explore',
                }}
            />
            <BottomTab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ size }) => <Icon source="account" size={size} color={theme.colors.primary} />,
                    tabBarLabel: 'Profile',
                }}
            />
        </BottomTab.Navigator>
    );
};

const PublicNavigator = () => {
    const theme = useTheme();
    return (
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
    );
};

const Navigation = () => {
    const { isAuthenticated } = useAuth();
    return <NavigationContainer>{isAuthenticated ? <SignedInNavigator /> : <PublicNavigator />}</NavigationContainer>;
};

const AppContent = () => {
    const theme = useTheme();
    return (
        <>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            <Navigation />
        </>
    );
};
