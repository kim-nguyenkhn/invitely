import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { AddGuestsScreen } from './src/screens/AddGuestsScreen';
import { CreateEventScreen } from './src/screens/CreateEventScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { InvitelyTheme } from './src/theme';
import { ScreenNames } from './src/typedefs';

const Stack = createStackNavigator();

export const ScreenRoutes = {
    [ScreenNames.Dashboard]: DashboardScreen,
    [ScreenNames.CreateEvent]: CreateEventScreen,
    [ScreenNames.AddGuests]: AddGuestsScreen,
};

// Should be Login or Dashboard
const INITIAL_ROUTE_NAME = ScreenNames.Dashboard;

export default function App() {
    return (
        <PaperProvider theme={InvitelyTheme}>
            <SafeAreaView style={styles.topLevelContainer}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={INITIAL_ROUTE_NAME}
                        screenOptions={{
                            // Do not show a title in the header AppBar
                            cardStyle: {
                                backgroundColor: InvitelyTheme.colors.background,
                            },
                            headerBackground: () => (
                                <LinearGradient
                                    colors={[
                                        InvitelyTheme.colors.primary,
                                        InvitelyTheme.colors.accent,
                                    ]}
                                    style={{ flex: 1 }}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                            ),
                            headerTintColor: InvitelyTheme.colors.textLight,
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
