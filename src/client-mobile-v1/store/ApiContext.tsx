import { ReactNode, createContext } from 'react';
import { AuthApi, Configuration, DefaultApi, Middleware } from '../api-client';
import Constants from 'expo-constants';
import { useSnack } from '../hooks/use-snack';

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
    const { pushSnack } = useSnack();

    const errorMiddleWare: Middleware = {
        post: async (context) => {
            const { response } = context;
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            const responseClone = response.clone();
            const payload = await responseClone.json();
            if (payload.message) {
                pushSnack(payload.message);
            } else {
                pushSnack('Something went wrong.');
            }
            return response;
        },
    };

    const apiConfiguration = new Configuration({
        basePath: Constants.expoConfig?.extra?.apiBasePath,
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
        credentials: 'omit',
        middleware: [errorMiddleWare],
    });

    // Add new apis here
    const contextValue: ApiContextValue = {
        authApi: new AuthApi(apiConfiguration),
        defaultApi: new DefaultApi(apiConfiguration),
    };

    return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
