import * as React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  CommonActions,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
export type TabsDrawerNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
export type TabsDrawerNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabsDrawerNavigationOptions,
  TabsDrawerNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

function TabsDrawerNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabsDrawerNavigationOptions,
      TabsDrawerNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View style={[{ flexDirection: 'row' }, tabBarStyle]}>
        {state.routes.map((route, index) => (
          <Pressable
            key={route.key}
            onPress={() => {
              const isFocused = state.index === index;
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
                data: {
                  isAlreadyFocused: isFocused,
                },
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.dispatch({
                  ...CommonActions.navigate(route),
                  target: state.key,
                });
              }
            }}
            style={{ flex: 1 }}
          >
            <Text>{descriptors[route.key].options.title ?? route.name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                { display: i === state.index ? 'flex' : 'none' },
              ]}
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabsDrawerNavigationOptions,
  TabsDrawerNavigationEventMap,
  typeof TabsDrawerNavigator
>(TabsDrawerNavigator);

export const createTabsDrawerNavigator = createNavigatorFactory(TabsDrawerNavigator);