import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { FAB, List } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';
import { ScreenNames } from '../../App';
import { Header } from '../components/Header';
import { InvitelyTheme } from '../theme';
import { Event, Navigation } from '../types';

export interface DashboardScreenProps {
    navigation: Navigation;
}

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        navigation.setOptions({
            // Do not show AppBar on this screen
            header: () => null,
            headerMode: 'none',
        });

        // TODO(backend): pull events from backend
        const SAMPLE_EVENT: Event = {
            name: 'First Event',
            description: "Kim's Birthday on March 24th",
        };

        setEvents([SAMPLE_EVENT, SAMPLE_EVENT, SAMPLE_EVENT]);
    }, []);

    return (
        <View style={{ height: '100%' }}>
            <LinearGradient
                colors={[InvitelyTheme.colors.primary, InvitelyTheme.colors.accent]}
                style={{
                    justifyContent: 'center',
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Header
                    titleStyle={{ color: InvitelyTheme.colors.textLight }}
                    viewStyle={{
                        paddingTop: 85 + StatusBar.currentHeight,
                        paddingBottom: 45,
                    }}
                >
                    Events
                </Header>
            </LinearGradient>
            {events.map(({ name, description }, index) => (
                <List.Item
                    key={`${name}-${index}`}
                    description={description}
                    left={() => <List.Icon icon="folder" />}
                    title={name}
                />
            ))}
            <FAB
                icon="plus"
                onPress={() => navigation.navigate(ScreenNames.CreateEvent)}
                style={styles.fab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: InvitelyTheme.colors.primary,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
