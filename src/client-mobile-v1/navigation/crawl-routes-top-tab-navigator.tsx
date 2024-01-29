import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { CrawlRoutesListScreen } from '../screens';

const Tab = createMaterialTopTabNavigator();

const CrawlRoutesTopTabNavigator = () => {
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

export default CrawlRoutesTopTabNavigator;
