import { Formik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Caption } from 'react-native-paper';

import { FormDateTimePicker } from '../components/FormDateTimePicker';
import { FormInput } from '../components/FormInput';
import { FormRadioGroup } from '../components/FormRadioGroup';
import { FormSubmitButton } from '../components/FormSubmitButon';
import { Header } from '../components/Header';
import { ViewWithBackground } from '../components/ViewWithBackground';
import { CustomColors } from '../theme';
import { Event, EventSchema, Navigation } from '../types';

const initialValues: Event = {
    color: CustomColors.Turquoise,
    description: '',
    name: "Kim's Birthday",
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
        <ScrollView>
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
                            <ViewWithBackground
                                handleChange={handleChange('color')}
                                values={values}
                            />
                            <Caption style={styles.asteriskMessage}>
                                * indicates required fields
                            </Caption>
                            <FormInput
                                errorMessage={errors.name}
                                label="Event Name*"
                                handleChangeText={handleChange('name')}
                                handleBlur={handleBlur('name')}
                                touched={touched.name}
                                value={values.name}
                            />
                            <FormRadioGroup
                                errorMessage={errors.eventType}
                                label="Event Type*"
                                handleChange={handleChange('eventType')}
                                touched={touched.eventType}
                                value={values.eventType}
                            />
                            {/* NOTE: Comment <FormDateTimePicker> if you want to run on Web */}
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
        </ScrollView>
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
