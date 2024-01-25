import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const ProfileScreen = () => {
    const theme = useTheme();
    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <Text>Profile Screen</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
