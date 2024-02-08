import * as ScreenOrientation from 'expo-screen-orientation';
import { ReactNode, createContext, useEffect, useState } from 'react';
import * as Device from 'expo-device';

interface OrientationContextValue {
    currentOrientation: ScreenOrientation.Orientation;
}
export const OrientationContext = createContext<OrientationContextValue | null>(null);

interface OrientationProviderProps {
    children: ReactNode;
}
export const OrientationProvider = (props: OrientationProviderProps) => {
    const { children } = props;

    const [currentOrientation, setCurrentOrientation] = useState<ScreenOrientation.Orientation>(
        ScreenOrientation.Orientation.PORTRAIT_UP,
    );

    const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
        setCurrentOrientation(event.orientationInfo.orientation);
    };

    useEffect(() => {
        if (Device.deviceType === Device.DeviceType.PHONE) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }

        const initOrientation = async () => {
            const orientation = await ScreenOrientation.getOrientationAsync();
            setCurrentOrientation(orientation);
        };
        initOrientation();
        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

        return () => {
            // Cleanup: Remove the orientation change listener when the component unmounts
            subscription.remove();
        };
    }, []);

    const contextValue: OrientationContextValue = {
        currentOrientation,
    };

    return <OrientationContext.Provider value={contextValue}>{children}</OrientationContext.Provider>;
};
