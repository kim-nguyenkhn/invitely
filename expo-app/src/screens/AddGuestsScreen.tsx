import * as ExpoContacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Header } from '../components/Header';

type Contact = ExpoContacts.Contact;

export function AddGuestsScreen() {
    const [contactsList, setContactsList] = useState<Contact[]>([]);

    /**
     * Requests user permissions for Contacts - if granted, sets the contacts to React state
     */
    const requestUserForContacts = async () => {
        const { status } = await ExpoContacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await ExpoContacts.getContactsAsync({
                fields: [
                    ExpoContacts.Fields.Emails,
                    ExpoContacts.Fields.PhoneNumbers,
                ],
            });

            return data;
        } else {
            console.log('Contacts permission not granted.');
            return null;
        }
    };

    /**
     * Generates key for the SectionList item.
     */
    const keyExtractor = (contact: Contact, index: number): string => {
        return `${contact.firstName}-${contact.lastName}-${index}`;
    };

    /**
     * Renders the actual JSX element to display the Contact.
     */
    const renderContactListItem = ({
        item: contact,
    }: ListRenderItemInfo<Contact>) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>
                    {contact.firstName} {contact.lastName}
                </Text>
            </View>
        );
    };

    useEffect(() => {
        requestUserForContacts().then(setContactsList).catch(console.error);

        return () => {
            setContactsList([]);
        };
    }, []);

    return (
        <View>
            <Header>Add Contacts</Header>
            <FlatList
                data={contactsList}
                keyExtractor={keyExtractor}
                renderItem={renderContactListItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
