import Constants from 'expo-constants';

export const composeAppTitle = (screenTitle?: string) => {
    return `${Constants.expoConfig?.name} - ${screenTitle}`;
};
