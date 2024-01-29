import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { CrawlRouteDetailsScreen, CrawlRouteMapScreen } from '../screens';
import MainBottomTabsNavigator from './main-bottom-tabs-navigator';

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
            <Stack.Screen name="bottom-tabs" component={MainBottomTabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="crawl-route-details" component={CrawlRouteDetailsScreen} />
            <Stack.Screen name="crawl-route-map" component={CrawlRouteMapScreen} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
