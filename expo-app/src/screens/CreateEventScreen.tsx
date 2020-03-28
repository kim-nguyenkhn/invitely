import { Formik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { FormInput } from '../components/FormInput';
import { Header } from '../components/Header';
import { Event, EventSchema, Navigation } from '../types';

const initialValues: Event = {
    eventDescription: '',
    eventName: '',
    eventType: '',
};

interface CreateEventScreenProps {
    navigation: Navigation;
}

export function CreateEventScreen({ navigation }: CreateEventScreenProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Cancel</Button>,
            headerRight: () => (
                <Button onPress={() => console.log('nothing happens')}>Save draft</Button>
            ),
        });
    }, []);

    return (
        <View>
            <Header>Create an event</Header>
            <View style={styles.form}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={EventSchema}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <FormInput
                                label="Event Name*"
                                onChangeText={handleChange('eventName')}
                                onBlur={handleBlur('eventName')}
                                value={values.eventName}
                            />

                            <Button onPress={handleSubmit}>Submit</Button>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 16,
        paddingBottom: 16,
    },
});
