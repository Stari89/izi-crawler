import { ReactNode, createContext } from 'react';
import { AuthApi, Configuration, DefaultApi } from '../api-client';
import Constants from 'expo-constants';

// Add new apis here
interface ApiContextValue {
    authApi: AuthApi;
    defaultApi: DefaultApi;
}

export const ApiContext = createContext<ApiContextValue | null>(null);

interface ApiProviderProps {
    children: ReactNode;
}
export const ApiProvider = (props: ApiProviderProps) => {
    const { children } = props;
    const apiConfiguration = new Configuration({
        basePath: Constants.expoConfig?.extra?.apiBasePath,
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
        credentials: 'omit',
    });

    // Add new apis here
    const contextValue: ApiContextValue = {
        authApi: new AuthApi(apiConfiguration),
        defaultApi: new DefaultApi(apiConfiguration),
    };

    return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
