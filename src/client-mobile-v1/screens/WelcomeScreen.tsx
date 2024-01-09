import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const WelcomeScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.rootContainer}>
            <Text variant="bodyLarge" theme={{ colors: { onSurface: theme.colors.onBackground } }}>
                Welcome to Izi Crawler!
            </Text>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
