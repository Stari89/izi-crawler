import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const HomeScreen = () => {
    const theme = useTheme();

    useEffect(() => {
        console.log('HOME useEffect');
    }, []);

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Home Screen</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
