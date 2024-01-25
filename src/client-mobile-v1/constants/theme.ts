import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { COLORS } from './colors';

export const DARK_THEME: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: COLORS.primary600,
        onPrimary: COLORS.primary100,
        primaryContainer: COLORS.primary300,
        onPrimaryContainer: COLORS.primary900,
    },
};

export const LIGHT_THEME: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: COLORS.primary600,
        onPrimary: COLORS.primary100,
        primaryContainer: COLORS.primary300,
        onPrimaryContainer: COLORS.primary900,
    },
};
