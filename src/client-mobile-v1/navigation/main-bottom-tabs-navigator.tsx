import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CrawlScreen, ExploreScreen, HomeScreen, ProfileScreen } from '../screens';
import CrawlRoutesTopTabNavigator from './crawl-routes-top-tab-navigator';
import { NAVIGATION_NAMES } from '../constants/navigation-names';

const BottomTab = createBottomTabNavigator();

const MainBottomTabsNavigator = () => {
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
                name={NAVIGATION_NAMES.home}
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
                name={NAVIGATION_NAMES.crawlRoutesNavigator}
                component={CrawlRoutesTopTabNavigator}
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
                name={NAVIGATION_NAMES.crawl}
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
                name={NAVIGATION_NAMES.explore}
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
                name={NAVIGATION_NAMES.profile}
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

export default MainBottomTabsNavigator;
