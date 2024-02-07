import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { composeAppTitle } from '../../../../util/screen-title';

const TabsLayout = () => {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerTintColor: theme.colors.onBackground,
                tabBarStyle: { backgroundColor: theme.colors.background },
                tabBarActiveTintColor: theme.colors.primary,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="home"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Home',
                    title: composeAppTitle('Home'),
                }}
            />
            <Tabs.Screen
                name="(routes)"
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="map-legend"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Routes',
                    title: composeAppTitle('Routes'),
                }}
            />
            <Tabs.Screen
                name="crawl"
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="beer"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Crawl',
                    title: composeAppTitle('Crawl'),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="compass"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Explore',
                    title: composeAppTitle('Explore'),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            source="account"
                            size={size}
                            color={focused ? theme.colors.primary : theme.colors.onSurface}
                        />
                    ),
                    tabBarLabel: 'Profile',
                    title: composeAppTitle('Profile'),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
