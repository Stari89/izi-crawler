import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from '../../constants';
import { PaperProvider, Portal, Snackbar } from 'react-native-paper';
import {
    ApiProvider,
    AuthProvider,
    CrawlRouteProvider,
    FeedProvider,
    OrientationProvider,
    SnackProvider,
} from '../../store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { useSnack } from '../../hooks/use-snack';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
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
                                <SnackProvider>
                                    <LayoutContent />
                                </SnackProvider>
                            </CrawlRouteProvider>
                        </FeedProvider>
                    </AuthProvider>
                </ApiProvider>
            </PaperProvider>
        </OrientationProvider>
    );
};

export default MainLayout;

const LayoutContent = () => {
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const { snack } = useSnack();

    useEffect(() => {
        if (!snack) return;
        setSnackBarText(snack);
        setSnackBarVisible(true);
    }, [snack]);

    return (
        <>
            <Slot />
            <Portal>
                <Snackbar
                    visible={snackBarVisible}
                    onDismiss={() => setSnackBarVisible(false)}
                    wrapperStyle={{ top: 0 }}
                >
                    {snackBarText}
                </Snackbar>
            </Portal>
        </>
    );
};
