import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Caption, IconButton, TextInput } from 'react-native-paper';

import { InvitelyTheme } from '../theme';

type DateTimePickerMode = 'date' | 'time';

interface FormDateTimePickerProps {
    errorMessage: FormikErrors<Date>;
    fieldName: string;
    label: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
    touched: FormikTouched<Date>;
    value: Date;
}

export function FormDateTimePicker({
    errorMessage,
    fieldName,
    label,
    setFieldValue,
    setFieldTouched,
    touched,
    value,
}: FormDateTimePickerProps) {
    const [mode, setMode] = useState<DateTimePickerMode>('date');
    const [show, setShow] = useState<boolean>(false);

    const clearTextInput = () => {
        setFieldValue(fieldName, null);
        setFieldTouched(fieldName, false);
    };

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate !== undefined) {
            setFieldValue(fieldName, selectedDate);
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        // We have to set a default value for the date as we open the datepicker
        if (value == null) {
            setFieldValue(fieldName, new Date());
        }

        Keyboard.dismiss();
        showMode('date');
    };

    const showTimePicker = () => {
        Keyboard.dismiss();
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelAndInputContainer}>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                        style={styles.inputStartAdornment}
                        name="calendar-blank"
                        size={24}
                    />
                    <TextInput
                        style={styles.inputElement}
                        onFocus={showDatePicker}
                        placeholder={label}
                        value={stringFromDate(value)}
                    />
                    <View>
                        <IconButton
                            color={value ? InvitelyTheme.colors.inputsAndButtons : '#fff'}
                            disabled={!value}
                            icon="close-circle"
                            onPress={clearTextInput}
                        />
                    </View>
                </View>
            </View>
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
        marginTop: 16,
    },
    errorMessage: {
        color: 'red',
    },
    labelAndInputContainer: {
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputElement: {
        backgroundColor: InvitelyTheme.colors.background,
        flex: 1,
        height: 36,
        textAlign: 'left',
        paddingHorizontal: 0,
    },
    inputStartAdornment: {
        marginRight: 16,
    },
});

function stringFromDate(d: Date) {
    return d ? d.toLocaleString() : '';
}

function formatDateToMonthDayYear(d: Date) {
    if (!d) return null;

    // Note that Date.getMonth() returns zero-based values, hence +1
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function formatDateToHoursMinutes(d: Date) {
    if (!d) return null;

    let hours = d.getHours();
    // Add a leading 0 to single digit minutes
    const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    if (hours > 12) {
        // Convert 24-hour time to 12-hour time
        hours -= 12;
        return `${hours}:${minutes}pm`;
    } else {
        return `${hours}:${minutes}am`;
    }
}
