import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { composeAppTitle } from '../../../../util/screen-title';
import TabsDrawerContent from '../../../../components/ui/TabsDrawerContent';
import { Drawer } from 'expo-router/drawer';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

interface SimpleScreenOptions {
    name: string;
    icon: string;
    label: string;
}

const screenOptions: SimpleScreenOptions[] = [
    {
        name: 'index',
        icon: 'home',
        label: 'Home',
    },
    {
        name: '(routes)',
        icon: 'map-legend',
        label: 'Routes',
    },
    {
        name: 'crawl',
        icon: 'beer',
        label: 'Crawl',
    },
    {
        name: 'explore',
        icon: 'compass',
        label: 'Explore',
    },
    {
        name: 'profile',
        icon: 'account',
        label: 'Profile',
    },
];

const TabsLayout = () => {
    const theme = useTheme();

    const [currentOrientation, setCurrentOrientation] = useState<ScreenOrientation.Orientation>(
        ScreenOrientation.Orientation.PORTRAIT_UP,
    );

    const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
        setCurrentOrientation(event.orientationInfo.orientation);
    };

    useEffect(() => {
        const initOrientation = async () => {
            const orientation = await ScreenOrientation.getOrientationAsync();
            setCurrentOrientation(orientation);
        };
        initOrientation();
        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

        return () => {
            // Cleanup: Remove the orientation change listener when the component unmounts
            subscription.remove();
        };
    }, []);

    const showDrawer =
        currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

    if (showDrawer) {
        return (
            <Drawer
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerTintColor: theme.colors.onBackground,
                    headerShown: false,
                    drawerType: 'permanent',
                    drawerStyle: { flexShrink: 1, width: 'auto', backgroundColor: theme.colors.background },
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
                        }}
                    />
                ))}
            </Drawer>
        );
    }

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
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabsLayout;
