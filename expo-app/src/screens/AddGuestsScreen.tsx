import * as ExpoContacts from 'expo-contacts';
import phone from 'phone';
import React, { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Header } from '../components/Header';
import { InvitelyTheme } from '../theme';

interface FormattedContact {
    fullName: string;
    emails: ExpoContacts.Email[];
    phoneNumbers: string[];
}

export function AddGuestsScreen() {
    const [contactsList, setContactsList] = useState<ExpoContacts.Contact[]>(
        []
    );

    const formattedContactsList: FormattedContact[] = useMemo(() => {
        if (!contactsList.length) return [];

        const result: FormattedContact[] = contactsList
            .filter(
                (contact: ExpoContacts.Contact) =>
                    contact.emails || contact.phoneNumbers
            )
            .map(contact => {
                const { emails, name, phoneNumbers } = contact;
                let cleanedPhoneNumbers: string[];

                if (phoneNumbers) {
                    // Sanitize phone numbers into E164 format
                    cleanedPhoneNumbers = phoneNumbers.map(
                        (phoneNumber: ExpoContacts.PhoneNumber) => {
                            // e.g., returns ['+18175698900, 'USA'][0]
                            return phone(phoneNumber.number)[0];
                        }
                    );

                    // Remove duplicate phone numbers
                    cleanedPhoneNumbers = [...new Set(cleanedPhoneNumbers)];
                }

                return {
                    fullName: name,
                    emails,
                    phoneNumbers: cleanedPhoneNumbers,
                };
            })
            .sort((a, b) => {
                // normalize casing
                const nameA = a.fullName.toUpperCase();
                const nameB = b.fullName.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;

                // names must be equal
                return 0;
            });

        return result;
    }, [contactsList]);

    /**
     * Generates key for the SectionList item.
     */
    const keyExtractor = (contact: FormattedContact, index: number): string => {
        return `${contact.fullName}--${index}`;
    };

    /**
     * Renders the actual JSX element to display the Contact.
     */
    const renderContactListItem = ({
        item: contact,
    }: ListRenderItemInfo<FormattedContact>) => {
        return (
            <View style={styles.listItemContainer}>
                <Text>Name: {contact.fullName}</Text>
                {contact.emails && (
                    <Text>
                        Emails: {JSON.stringify(contact.emails, null, 2)}
                    </Text>
                )}
                {contact.phoneNumbers && (
                    <Text>
                        Phone Numbers:{' '}
                        {JSON.stringify(contact.phoneNumbers, null, 2)}
                    </Text>
                )}
            </View>
        );
    };

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
                data={formattedContactsList}
                keyExtractor={keyExtractor}
                renderItem={renderContactListItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: InvitelyTheme.colors.background,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
