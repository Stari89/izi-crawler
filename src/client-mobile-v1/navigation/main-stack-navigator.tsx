import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { CrawlRouteDetailsScreen, CrawlRouteMapScreen } from '../screens';
import MainBottomTabsNavigator from './main-bottom-tabs-navigator';
import { NAVIGATION_NAMES } from '../constants/navigation-names';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    const theme = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.onPrimary,
            }}
        >
            <Stack.Screen
                name={NAVIGATION_NAMES.bottomTabsNavigator}
                component={MainBottomTabsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={NAVIGATION_NAMES.crawlRouteDetails} component={CrawlRouteDetailsScreen} />
            <Stack.Screen name={NAVIGATION_NAMES.crawlRouteMap} component={CrawlRouteMapScreen} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
