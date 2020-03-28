import { Formik } from 'formik';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import * as Yup from "Yup";

import { Header } from '../components/Header';

export function CreateEventScreen({ navigation }) {
    const [eventName, setEventName] = useState<string>('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Cancel</Button>,
            headerRight: () => <Button onPress={() => console.log('nothing happens')}>Save draft</Button>
        });
    }, [])

    return (
        <View>
            <Header>Create an event</Header>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    />
                    <Button onPress={handleSubmit}>Submit</Button>
                </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({});