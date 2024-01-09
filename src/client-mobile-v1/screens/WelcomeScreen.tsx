import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const WelcomeScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/welcome-02.jpg')} />
            </View>
            <Text
                variant="headlineSmall"
                style={styles.greeting}
                theme={{ colors: { onSurface: theme.colors.onBackground } }}
            >
                Welcome to Izi Crawler!
            </Text>
            <View style={styles.buttonsContainer}>
                <Button mode="contained" style={styles.button}>
                    Join for free
                </Button>
                <Button mode="outlined" style={styles.button}>
                    Log In
                </Button>
            </View>
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
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    greeting: {
        marginVertical: 64,
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'stretch',
        marginBottom: 32,
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 16,
    },
});
