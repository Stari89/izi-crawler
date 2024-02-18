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

const ProfileLayout = () => {
    const theme = useTheme();

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarStyle: { backgroundColor: theme.colors.primary },
                tabBarActiveTintColor: theme.colors.onPrimary,
                tabBarIndicatorStyle: { backgroundColor: theme.colors.onPrimary },
            }}
        >
            <Tabs.Screen name="index" options={{ title: composeAppTitle('My Profile'), tabBarLabel: 'My Profile' }} />
            <Tabs.Screen
                name="my-activity"
                options={{ title: composeAppTitle('My Activity'), tabBarLabel: 'My Activity' }}
            />
        </MaterialTopTabs>
    );
};

export default ProfileLayout;
