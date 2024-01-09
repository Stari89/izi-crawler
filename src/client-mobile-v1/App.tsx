import { StatusBar } from 'expo-status-bar';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const theme = useTheme();

    return (
        <PaperProvider>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
