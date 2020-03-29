import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, List } from 'react-native-paper';

import { ScreenNames } from '../../App';
import { Header } from '../components/Header';
import { Event, Navigation } from '../types';

export interface DashboardScreenProps {
    navigation: Navigation;
}

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        // TODO(backend): pull events from backend
        const SAMPLE_EVENT: Event = {
            name: 'First Event',
            description: "Kim's Birthday on March 24th",
        };

        setEvents([SAMPLE_EVENT, SAMPLE_EVENT, SAMPLE_EVENT]);
    }, []);

    return (
        <View style={{ height: '100%' }}>
            <Header>Events</Header>
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
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
