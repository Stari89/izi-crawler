import { Tabs } from 'expo-router';
import { Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { composeAppTitle } from '../../../../util/screen-title';
import TabsDrawerContent from '../../../../components/ui/TabsDrawerContent';
import { Drawer } from 'expo-router/drawer';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { useOrientation } from '../../../../hooks';

interface SimpleScreenOptions {
    name: string;
    icon: string;
    label: string;
    headerShown: boolean;
    headerRight?:
        | ((props: {
              tintColor?: string | undefined;
              pressColor?: string | undefined;
              pressOpacity?: number | undefined;
          }) => React.ReactNode)
        | undefined;
}

const screenOptions: SimpleScreenOptions[] = [
    {
        name: 'index',
        icon: 'home',
        label: 'Home',
        headerShown: false,
    },
    {
        name: '(routes)',
        icon: 'map-legend',
        label: 'Routes',
        headerShown: false,
    },
    {
        name: 'crawl',
        icon: 'beer',
        label: 'Crawl',
        headerShown: false,
    },
    {
        name: 'explore',
        icon: 'compass',
        label: 'Explore',
        headerShown: false,
    },
    {
        name: '(profile)',
        icon: 'account',
        label: 'Profile',
        headerShown: true,
        headerRight: ({ tintColor }) => <IconButton iconColor={tintColor} icon="cog" />,
    },
];

const TabsLayout = () => {
    const theme = useTheme();

    const { currentOrientation } = useOrientation();
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        const showDrawer =
            currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
            currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
        setShowDrawer(showDrawer);
    }, [currentOrientation]);

    if (showDrawer) {
        return (
            <Drawer
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: theme.colors.onPrimary,
                    headerShown: false,
                    drawerType: 'permanent',
                    drawerStyle: { flexShrink: 1, width: 'auto', backgroundColor: theme.colors.background },
                    headerLeft: () => null,
                }}
                drawerContent={(props) => <TabsDrawerContent {...props} />}
            >
                {screenOptions.map((s, i) => (
                    <Drawer.Screen
                        key={i}
                        name={s.name}
                        options={{
                            drawerIcon: ({ size, focused }) => (
                                <Icon
                                    source={s.icon}
                                    size={size}
                                    color={focused ? theme.colors.primary : theme.colors.onSurface}
                                />
                            ),
                            drawerLabel: s.label,
                            title: composeAppTitle(s.label),
                            headerShown: s.headerShown,
                            headerRight: s.headerRight,
                        }}
                    />
                ))}
            </Drawer>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.onPrimary,
                tabBarStyle: { backgroundColor: theme.colors.background },
                tabBarActiveTintColor: theme.colors.primary,
                headerShown: false,
            }}
        >
            {screenOptions.map((s, i) => (
                <Tabs.Screen
                    key={i}
                    name={s.name}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Icon
                                source={s.icon}
                                size={size}
                                color={focused ? theme.colors.primary : theme.colors.onSurface}
                            />
                        ),
                        tabBarLabel: s.label,
                        title: composeAppTitle(s.label),
                        headerShown: s.headerShown,
                        headerRight: s.headerRight,
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabsLayout;
