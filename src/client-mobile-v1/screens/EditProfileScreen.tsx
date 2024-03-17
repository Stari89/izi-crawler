import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const EditProfileScreen = () => {
    const theme = useTheme();

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.container}>
                <Text>Edit profile</Text>
            </View>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    container: {
        marginTop: 16,
        maxWidth: 800,
        width: '100%',
    },
    button: {
        marginVertical: 4,
    },
});
