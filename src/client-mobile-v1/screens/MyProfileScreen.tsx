import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const MyProfileScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>My Profile Screen</Text>
        </View>
    );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
