import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const theme = useTheme();

    return (
        <PaperProvider>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }}>
                    <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
