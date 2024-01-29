import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks';
import PublicNavigator from './public-navigator';
import MainStackNavigator from './main-stack-navigator';

const Navigation = () => {
    const { isAuthenticated } = useAuth();
    return <NavigationContainer>{isAuthenticated ? <MainStackNavigator /> : <PublicNavigator />}</NavigationContainer>;
};

export default Navigation;
