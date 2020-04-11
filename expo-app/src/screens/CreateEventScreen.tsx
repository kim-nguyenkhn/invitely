import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ContentContainer from '../components/ContentContainer';
import { FormDateTimePicker } from '../components/FormDateTimePicker';
import { FormInput } from '../components/FormInput';
import { FormSubmitButton } from '../components/FormSubmitButton';
import { Header } from '../components/Header';
import { EventSchema } from '../schemas';
import { Event, Navigation, ScreenNames } from '../typedefs';

const initialValues: Event = {
    name: '',
    startDate: null,
};

interface CreateEventScreenProps {
    navigation: Navigation;
}

export function CreateEventScreen({ navigation }: CreateEventScreenProps) {
    return (
        <ScrollView>
            <Header>Create Event</Header>
            <ContentContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={EventSchema}
                    onSubmit={values => {
                        console.log('Form values', values);
                        // TODO: Validate the values, then submit them to serverside to save the event to datastore
                        // On success, need to clear the form after submission. Then, navigate to AddGuestsScreen
                        navigation.navigate(ScreenNames.AddGuests);
                    }}
                >
                    {({
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldTouched,
                        setFieldValue,
                        touched,
                        values,
                    }) => (
                        <View>
                            <FormInput
                                errorMessage={errors.name}
                                fieldName="name"
                                label="Event Name"
                                handleChangeText={handleChange('name')}
                                handleBlur={handleBlur('name')}
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                                startAdornment={
                                    <MaterialCommunityIcons name="tag-outline" size={24} />
                                }
                                touched={touched.name}
                                value={values.name}
                            />
                            {/* NOTE: Comment DateTimePicker out to run on Web */}
                            <FormDateTimePicker
                                errorMessage={errors.startDate}
                                fieldName="startDate"
                                label="Date &amp; Time"
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                                touched={touched.startDate}
                                value={values.startDate}
                            />
                            {/* TODO: implement Location */}
                            <FormSubmitButton
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </View>
                    )}
                </Formik>
            </ContentContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
