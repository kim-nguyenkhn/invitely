import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';

import { AppBarButton } from '../components/AppBarButton';
import { FormDateTimePicker } from '../components/FormDateTimePicker';
import { FormInput } from '../components/FormInput';
import { FormRadioGroup } from '../components/FormRadioGroup';
import { FormSubmitButton } from '../components/FormSubmitButton';
import { Header } from '../components/Header';
import { ViewWithBackground } from '../components/ViewWithBackground';
import { CustomColors } from '../theme';
import { Event, EventSchema, Navigation } from '../types';

const initialValues: Event = {
    color: CustomColors.Turquoise,
    description: '',
    name: '',
    startTime: null,
};

interface CreateEventScreenProps {
    navigation: Navigation;
}

export function CreateEventScreen({ navigation }: CreateEventScreenProps) {
    return (
        <ScrollView>
            <Header>Create Event</Header>
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
                        setFieldTouched,
                        setFieldValue,
                        touched,
                        values,
                    }) => (
                        <View>
                            {/* <ViewWithBackground
                                handleChange={handleChange('color')}
                                values={values}
                            /> */}
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
                            {/* NOTE: Comment <FormDateTimePicker> if you want to run on Web */}
                            <FormDateTimePicker
                                errorMessage={errors.startTime}
                                fieldName="startTime"
                                label="Date &amp; Time"
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                                touched={touched.startTime}
                                value={values.startTime}
                            />
                            <FormSubmitButton
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    asteriskMessage: {
        marginBottom: 8,
    },
    form: {
        paddingLeft: 32,
        paddingRight: 32,
    },
});
