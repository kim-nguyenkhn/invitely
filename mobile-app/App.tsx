import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Events" component={EventsScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}