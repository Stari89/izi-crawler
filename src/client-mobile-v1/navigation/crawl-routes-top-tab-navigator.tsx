import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { CrawlRoutesListScreen } from '../screens';
import { NAVIGATION_NAMES } from '../constants/navigation-names';

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
                name={NAVIGATION_NAMES.myRoutes}
                component={CrawlRoutesListScreen}
                options={{ title: 'My Routes' }}
                initialParams={{ showMyRoutes: true }}
            />
            <Tab.Screen
                name={NAVIGATION_NAMES.favoriteRoutes}
                component={CrawlRoutesListScreen}
                options={{ title: 'Favorites' }}
                initialParams={{ showMyRoutes: false }}
            />
        </Tab.Navigator>
    );
};

export default CrawlRoutesTopTabNavigator;
