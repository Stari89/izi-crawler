import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const ExploreScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Explore Screen</Text>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
