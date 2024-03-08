import { ReactNode, createContext, useState } from 'react';

interface SnackContextValue {
    pushSnack: (message: string) => void;
    snack: string | undefined;
}
export const SnackContext = createContext<SnackContextValue | null>(null);

interface SnackProviderProps {
    children: ReactNode;
}
export const SnackProvider = (props: SnackProviderProps) => {
    const { children } = props;
    const [snack, setSnack] = useState<string>();

    const contextValue: SnackContextValue = {
        pushSnack: setSnack,
        snack,
    };

    return <SnackContext.Provider value={contextValue}>{children}</SnackContext.Provider>;
};
