import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const MyActivityScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>My Activity Screen</Text>
        </View>
    );
};

export default MyActivityScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
