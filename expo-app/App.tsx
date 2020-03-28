import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { CreateEventScreen } from './src/screens/CreateEventScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { InvitelyTheme } from './src/theme';

const Stack = createStackNavigator();

export enum ScreenNames {
    Dashboard = 'Dashboard',
    CreateEvent = 'CreateEvent',
}

export const ScreenRoutes = {
    [ScreenNames.Dashboard]: DashboardScreen,
    [ScreenNames.CreateEvent]: CreateEventScreen,
};

export default function App() {
    return (
        <PaperProvider theme={InvitelyTheme}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        // Do not show a title in the header AppBar
                        headerTitle: '',
                    }}
                >
                    {Object.entries(ScreenRoutes).map(([screenName, screenComponent], index) => (
                        <Stack.Screen
                            key={`${screenName}-${index}`}
                            name={screenName}
                            component={screenComponent}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
