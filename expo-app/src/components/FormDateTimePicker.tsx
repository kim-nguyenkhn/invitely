import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Platform, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Caption } from 'react-native-paper';
import { FormikTouched } from 'formik';

type DateTimePickerMode = 'date' | 'time';

function formatDateToMonthDayYear(d: Date) {
    // Note that Date.getMonth() and Date.getDate() return zero-based values
    return `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
}

function formatDateToHoursMinutes(d: Date) {
    // Note that Date.getHours() returns a zero-based value
    let hours = d.getHours() + 1;
    if (hours > 12) {
        // Convert 24-hour time to 12-hour time
        hours -= 12;
    }
    return `${hours}-${d.getMinutes()}`;
}

interface FormDateTimePickerProps {
    errorMessage: any;
    label: any;
    handleChangeDateTime: any;
    touched: FormikTouched<Date>;
    value: any;
}

export function FormDateTimePicker({
    errorMessage,
    label,
    handleChangeDateTime,
    touched,
    value,
}: FormDateTimePickerProps) {
    const [mode, setMode] = useState<DateTimePickerMode>('date');
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            handleChangeDateTime(selectedDate);
        }
        setShow(Platform.OS === 'ios');
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
                <DateTimePicker value={value} mode={mode} display="default" onChange={onChange} />
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
