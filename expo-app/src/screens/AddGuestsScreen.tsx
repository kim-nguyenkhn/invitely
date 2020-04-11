import * as ExpoContacts from 'expo-contacts';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ContentContainer from '../components/ContentContainer';
import { Header } from '../components/Header';
import { RoundedButton } from '../components/RoundedButton';
import { InvitelyTheme } from '../theme';
import { dedupeArrayByProperty } from '../util/javascript';
import { E164PhoneNumberFromString, formatPhoneNumberForDisplay } from '../util/phone';

interface FormattedContact {
    fullName: string;
    emails: ExpoContacts.Email[];
    phoneNumbers: ExpoContacts.PhoneNumber[];
}

export function AddGuestsScreen() {
    const [contactsList, setContactsList] = useState<ExpoContacts.Contact[]>([]);

    const formattedContactsList: FormattedContact[] = useMemo(() => {
        if (!contactsList.length) return [];

        const result: FormattedContact[] = contactsList
            .filter((contact: ExpoContacts.Contact) => contact.emails || contact.phoneNumbers)
            .map(contact => {
                const { emails, name, phoneNumbers } = contact;
                let cleanedPhoneNumbers: ExpoContacts.PhoneNumber[];

                if (phoneNumbers) {
                    // Sanitize phone numbers into E164 format
                    cleanedPhoneNumbers = phoneNumbers.map(
                        (phoneNumber: ExpoContacts.PhoneNumber) => {
                            return {
                                ...phoneNumber,
                                // Sanitize/standardize phone number string
                                number: E164PhoneNumberFromString(
                                    phoneNumber.number,
                                    phoneNumber.countryCode
                                ),
                            };
                        }
                    );

                    // Remove duplicate phone numbers
                    cleanedPhoneNumbers = dedupeArrayByProperty(cleanedPhoneNumbers, 'number');
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
    const renderContactListItem = ({ item: contact }: ListRenderItemInfo<FormattedContact>) => {
        return (
            <View style={styles.listItemContainer}>
                <Text>{contact.fullName}</Text>
                {contact.emails && <Text>Emails: {JSON.stringify(contact.emails, null, 2)}</Text>}
                {contact.phoneNumbers &&
                    contact.phoneNumbers.map(
                        (phoneNumber: ExpoContacts.PhoneNumber, index: number) => {
                            return (
                                <Text
                                    key={`${phoneNumber}-${index}`}
                                    style={styles.phoneNumberString}
                                >
                                    {phoneNumber.label}:&nbsp;
                                    {formatPhoneNumberForDisplay(phoneNumber.number)}
                                </Text>
                            );
                        }
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
                fields: [ExpoContacts.Fields.Emails, ExpoContacts.Fields.PhoneNumbers],
            });

            return data;
        } else {
            console.log('Contacts permission not granted.');
            return null;
        }
    };

    /**
     * Wrapper around requestUserForContacts().
     */
    const handlePressAccessPermissions = () => {
        requestUserForContacts()
            .then(response => response && setContactsList(response))
            .catch(console.error);
    };

    /**
     * Navigates to Add New Contact screen.
     */
    const handlePressAddNewContact = () => {
        // TODO
    };

    useEffect(() => {
        // requestUserForContacts().then(setContactsList).catch(console.error);

        return () => {
            setContactsList([]);
        };
    }, []);

    return (
        <View>
            <Header>Invite Guests</Header>
            <ContentContainer>
                {formattedContactsList.length === 0 && (
                    <View>
                        <Text>You can add guests with the following methods below:</Text>
                        <RoundedButton mode="contained" onPress={handlePressAccessPermissions}>
                            Import from Contacts
                        </RoundedButton>
                        <RoundedButton mode="outlined" onPress={handlePressAddNewContact}>
                            Add Manually
                        </RoundedButton>
                    </View>
                )}

                {formattedContactsList && (
                    <FlatList
                        data={formattedContactsList}
                        keyExtractor={keyExtractor}
                        renderItem={renderContactListItem}
                    />
                )}
            </ContentContainer>
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
    phoneNumberString: {
        textTransform: 'capitalize',
    },
});
