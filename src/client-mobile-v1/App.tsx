import { StatusBar } from 'expo-status-bar';
import { PaperProvider, useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from './constants';
import { AuthProvider, CrawlRouteProvider } from './store';
import Navigation from './navigation/navigation';

const App = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <CrawlRouteProvider>
                    <AppContent />
                </CrawlRouteProvider>
            </AuthProvider>
        </PaperProvider>
    );
};
export default App;

const AppContent = () => {
    const theme = useTheme();
    return (
        <>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            <Navigation />
        </>
    );
};
