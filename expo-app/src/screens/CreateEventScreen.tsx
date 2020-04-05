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
                <AppBarButton onPress={() => navigation.goBack()}>
                    Cancel
                </AppBarButton>
            ),
            headerRight: () => (
                <AppBarButton onPress={() => console.log('nothing happens')}>
                    Save draft
                </AppBarButton>
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
        paddingLeft: 45,
        paddingRight: 45,
    },
});
