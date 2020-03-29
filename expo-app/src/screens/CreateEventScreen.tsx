import { Formik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Caption } from 'react-native-paper';

import { FormDateTimePicker } from '../components/FormDateTimePicker';
import { FormInput } from '../components/FormInput';
import { FormRadioGroup } from '../components/FormRadioGroup';
import { FormSubmitButton } from '../components/FormSubmitButon';
import { Header } from '../components/Header';
import { Event, EventSchema, Navigation } from '../types';

const initialValues: Event = {
    eventDescription: '',
    eventName: '',
    eventType: '',
    startTime: new Date(),
};

interface CreateEventScreenProps {
    navigation: Navigation;
}

export function CreateEventScreen({ navigation }: CreateEventScreenProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => navigation.goBack()}>Cancel</Button>
            ),
            headerRight: () => (
                <Button onPress={() => console.log('nothing happens')}>
                    Save draft
                </Button>
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
                    {({
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        touched,
                        values,
                    }) => (
                        <View>
                            <Caption style={styles.asteriskMessage}>
                                * indicates required fields
                            </Caption>
                            <FormInput
                                errorMessage={errors.eventName}
                                label="Event Name*"
                                handleChangeText={handleChange('eventName')}
                                handleBlur={handleBlur('eventName')}
                                touched={touched.eventName}
                                value={values.eventName}
                            />
                            <FormRadioGroup
                                errorMessage={errors.eventType}
                                label="Event Type*"
                                handleChange={handleChange('eventType')}
                                touched={touched.eventType}
                                value={values.eventType}
                            />
                            {/* DateTimePicker is NOT available on Web */}
                            <FormDateTimePicker
                                errorMessage={errors.startTime}
                                fieldName="startTime"
                                label="Start"
                                handleChangeDateTime={setFieldValue}
                                touched={touched.startTime}
                                value={values.startTime}
                            />
                            <FormSubmitButton
                                isSubmitting={isSubmitting}
                                handleSubmit={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    asteriskMessage: {
        marginBottom: 8,
    },
    form: {
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 16,
        paddingBottom: 16,
    },
});
