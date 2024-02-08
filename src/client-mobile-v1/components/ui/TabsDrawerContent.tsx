import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { Drawer, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const TabsDrawerContent = (props: DrawerContentComponentProps) => {
    const { colors } = useTheme();

    const { state, navigation, descriptors } = props;

    const focusedRoute = state.routes[state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;

    const {
        drawerActiveTintColor = colors.primary,
        drawerInactiveTintColor = colors.onBackground,
        drawerActiveBackgroundColor = colors.onPrimaryContainer,
        drawerInactiveBackgroundColor = colors.onBackground,
    } = focusedOptions;

    return (
        <DrawerContentScrollView {...props}>
            {props.state.routes.map((route, i) => {
                const focused = i === state.index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'drawerItemPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        navigation.dispatch({
                            ...(focused
                                ? DrawerActions.closeDrawer()
                                : CommonActions.navigate({ name: route.name, merge: true })),
                            target: state.key,
                        });
                    }
                };

                const { title, drawerLabel, drawerIcon, drawerLabelStyle, drawerItemStyle, drawerAllowFontScaling } =
                    descriptors[route.key].options;

                const color = focused ? drawerActiveTintColor : drawerInactiveTintColor;

                const icon: IconSource = (props: { size: number; allowFontScaling?: boolean; color: string }) =>
                    drawerIcon ? drawerIcon({ size: props.size, color: props.color, focused }) : null;

                return (
                    <Drawer.CollapsedItem
                        key={i}
                        focusedIcon={icon}
                        unfocusedIcon={icon}
                        label={drawerLabel as string}
                        onPress={onPress}
                    />
                );
            })}
        </DrawerContentScrollView>
    );
};

export default TabsDrawerContent;
