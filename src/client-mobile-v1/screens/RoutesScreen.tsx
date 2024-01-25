import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const RoutesScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Routes Screen</Text>
        </View>
    );
};

export default RoutesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
