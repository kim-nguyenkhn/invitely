import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { AddGuestsScreen } from './src/screens/AddGuestsScreen';
import { CreateEventScreen } from './src/screens/CreateEventScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { InvitelyTheme } from './src/theme';

const Stack = createStackNavigator();

export enum ScreenNames {
    Dashboard = 'Dashboard',
    CreateEvent = 'CreateEvent',
    AddGuests = 'AddGuests',
}

export const ScreenRoutes = {
    [ScreenNames.Dashboard]: DashboardScreen,
    [ScreenNames.CreateEvent]: CreateEventScreen,
    [ScreenNames.AddGuests]: AddGuestsScreen,
};

export default function App() {
    return (
        <PaperProvider theme={InvitelyTheme}>
            <SafeAreaView style={styles.topLevelContainer}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="AddGuests"
                        screenOptions={{
                            // Do not show a title in the header AppBar
                            cardStyle: {
                                backgroundColor:
                                    InvitelyTheme.colors.background,
                            },
                            headerTitle: '',
                        }}
                    >
                        {Object.entries(ScreenRoutes).map(
                            ([screenName, screenComponent], index) => (
                                <Stack.Screen
                                    key={`${screenName}-${index}`}
                                    name={screenName}
                                    component={screenComponent}
                                />
                            )
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    topLevelContainer: {
        flex: 1,
    },
});
