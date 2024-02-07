import { Tabs, withLayoutContext } from 'expo-router';
import { composeAppTitle } from '../../../../../util/screen-title';
import { useTheme } from 'react-native-paper';
import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const CrawlRoutesLayout = () => {
    const theme = useTheme();

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarStyle: { backgroundColor: theme.colors.primary },
                tabBarActiveTintColor: theme.colors.onPrimary,
                // headerShown: false,
                tabBarIndicatorStyle: { backgroundColor: theme.colors.onPrimary },
            }}
        >
            <Tabs.Screen name="my-routes" options={{ title: composeAppTitle('My Routes'), tabBarLabel: 'My Routes' }} />
            <Tabs.Screen
                name="favorite-routes"
                options={{ title: composeAppTitle('Favorites'), tabBarLabel: 'Favorites' }}
            />
        </MaterialTopTabs>
    );
};

export default CrawlRoutesLayout;
