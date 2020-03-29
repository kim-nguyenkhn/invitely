import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Platform, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Caption } from 'react-native-paper';
import { FormikTouched, FormikErrors } from 'formik';

type DateTimePickerMode = 'date' | 'time';

function formatDateToMonthDayYear(d: Date) {
    // Note that Date.getMonth() returns zero-based values, hence +1
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function formatDateToHoursMinutes(d: Date) {
    let hours = d.getHours();
    // Add a leading 0 to single digit minutes
    let minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    if (hours > 12) {
        // Convert 24-hour time to 12-hour time
        hours -= 12;
        return `${hours}:${minutes}pm`;
    } else {
        return `${hours}:${minutes}am`;
    }
}

interface FormDateTimePickerProps {
    errorMessage: FormikErrors<Date>;
    fieldName: string;
    label: string;
    handleChangeDateTime: any;
    touched: FormikTouched<Date>;
    value: Date;
}

export function FormDateTimePicker({
    errorMessage,
    fieldName,
    label,
    handleChangeDateTime,
    touched,
    value,
}: FormDateTimePickerProps) {
    const [mode, setMode] = useState<DateTimePickerMode>('date');
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate !== undefined) {
            handleChangeDateTime(fieldName, selectedDate);
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        Keyboard.dismiss();
        showMode('date');
    };

    const showTimePicker = () => {
        Keyboard.dismiss();
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.label}>{label} Date*</Text>
                <TextInput
                    mode="outlined"
                    onFocus={showDatePicker}
                    placeholder="mm/dd/yyyy"
                    value={formatDateToMonthDayYear(value)}
                />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.label}>{label} Time*</Text>
                <TextInput
                    mode="outlined"
                    onFocus={showTimePicker}
                    placeholder="hh:mm"
                    value={formatDateToHoursMinutes(value)}
                />
            </KeyboardAvoidingView>
            {show && (
                <DateTimePicker
                    minuteInterval={5}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    value={value}
                />
            )}
            {touched && errorMessage && (
                <Caption style={styles.errorMessage}>{errorMessage}</Caption>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    errorMessage: {
        color: 'red',
    },
    label: {},
});
