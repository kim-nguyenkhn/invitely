import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { CreateEventScreen } from './screens/CreateEventScreen';
import { EventsScreen } from './screens/EventsScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow'
  }
}

const Stack = createStackNavigator();

export enum ScreenNames {
  Events = "Events",
  CreateEvent = "CreateEvent"
}

export const ScreenRoutes = {
  [ScreenNames.Events]: EventsScreen,
  [ScreenNames.CreateEvent]: CreateEventScreen
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
          <Stack.Navigator>
            {
              Object.entries(ScreenRoutes)
                .map(([ screenName, screenComponent ]) => (
                  <Stack.Screen name={screenName} component={screenComponent} />
                ))
            }
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}