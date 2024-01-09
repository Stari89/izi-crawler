import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';

export default function App() {
    const theme = useTheme();

    return (
        <PaperProvider>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Text variant="bodyLarge" theme={{ colors: { onSurface: theme.colors.onBackground } }}>
                    Izi Crawler
                </Text>
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
