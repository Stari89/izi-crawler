import { StatusBar } from 'expo-status-bar';
import { Icon, PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    CrawlScreen,
    ExploreScreen,
    HomeScreen,
    LoginScreen,
    ProfileScreen,
    CrawlRoutesListScreen,
    SignupScreen,
    WelcomeScreen,
    CrawlRouteDetailsScreen,
    CrawlRouteMapScreen,
} from './screens';
import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from './constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './hooks/use-auth';
import { AuthProvider, CrawlRouteProvider } from './store';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <CrawlRouteProvider>
                    <AppContent />
                </CrawlRouteProvider>
            </AuthProvider>
        </PaperProvider>
    );
};
export default App;

const SignedInNavigator = () => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerTintColor: theme.colors.onBackground,
                tabBarStyle: { backgroundColor: theme.colors.background },
                tabBarActiveTintColor: theme.colors.primary,
                headerShown: false,
            }}
            sceneContainerStyle={{ paddingTop: insets.top }}
        >
            <BottomTab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="home"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <BottomTab.Screen
                name="crawl-routes"
                component={CrawlRouteNavigator}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="map-legend"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Routes',
                }}
            />
            <BottomTab.Screen
                name="crawl"
                component={CrawlScreen}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="beer"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Crawl',
                }}
            />
            <BottomTab.Screen
                name="explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="compass"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Explore',
                }}
            />
            <BottomTab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="account"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Profile',
                }}
            />
        </BottomTab.Navigator>
    );
};

const CrawlRouteNavigator = () => {
    const theme = useTheme();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="crawl-routes-list"
                component={CrawlRoutesListNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="crawl-route-details" component={CrawlRouteDetailsScreen} />
            <Stack.Screen name="crawl-route-map" component={CrawlRouteMapScreen} />
        </Stack.Navigator>
    );
};

const CrawlRoutesListNavigator = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: theme.colors.primary },
                tabBarActiveTintColor: theme.colors.onPrimary,
                tabBarIndicatorStyle: { backgroundColor: theme.colors.onPrimary },
            }}
        >
            <Tab.Screen
                name="my-routes"
                component={CrawlRoutesListScreen}
                options={{ title: 'My Routes' }}
                initialParams={{ myRoutes: true }}
            />
            <Tab.Screen
                name="favorite-routes"
                component={CrawlRoutesListScreen}
                options={{ title: 'Favorites' }}
                initialParams={{ myRoutes: false }}
            />
        </Tab.Navigator>
    );
};

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
