import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from '../constants';
import { PaperProvider } from 'react-native-paper';
import { ApiProvider, AuthProvider, CrawlRouteProvider, FeedProvider, OrientationProvider } from '../store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Slot, Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;

    useEffect(
        () => {
            if (true /* TODO: check if everything was loaded */) {
                SplashScreen.hideAsync();
            }
        },
        [
            /* TODO: add loaded dependencies */
        ],
    );

    /* TODO: Check for errors */
    // useEffect(() => {
    //     if (error) throw error;
    //   }, [error]);

    // if (!loaded) {
    //     return null;
    //   }

    return (
        <OrientationProvider>
            <PaperProvider theme={theme}>
                <ApiProvider>
                    <AuthProvider>
                        <FeedProvider>
                            <CrawlRouteProvider>
                                <Slot />
                            </CrawlRouteProvider>
                        </FeedProvider>
                    </AuthProvider>
                </ApiProvider>
            </PaperProvider>
        </OrientationProvider>
    );
};

export default RootLayout;
