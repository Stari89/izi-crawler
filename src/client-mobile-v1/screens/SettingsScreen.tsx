import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useAuth } from '../hooks';

const SettingsScreen = () => {
    const theme = useTheme();
    const { logout } = useAuth();

    return (
        <View style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.container}>
                <Button mode="outlined" textColor={theme.colors.error} onPress={logout}>
                    Log Out
                </Button>
            </View>
        </View>
    );
};

export default SettingsScreen;

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
});
