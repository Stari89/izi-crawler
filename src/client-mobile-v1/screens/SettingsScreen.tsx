import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const SettingsScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Settings Screen</Text>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
