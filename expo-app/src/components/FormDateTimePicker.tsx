import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Caption, Text, TextInput } from 'react-native-paper';

type DateTimePickerMode = 'date' | 'time';

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
        // TODO: Fix bugs where selecting date changes time and vice versa
        <View style={styles.container}>
            <View style={styles.labelAndInputContainer}>
                <Text>{label} Date*</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        mode="outlined"
                        onFocus={showDatePicker}
                        placeholder="mm/dd/yyyy"
                        value={formatDateToMonthDayYear(value)}
                    />
                    {/* <MaterialCommunityIcons
                        style={styles.inputIcon}
                        name="calendar"
                        size={24}
                    /> */}
                </View>
            </View>
            <View>
                <Text>{label} Time*</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        mode="outlined"
                        onFocus={showTimePicker}
                        placeholder="hh:mm"
                        value={formatDateToHoursMinutes(value)}
                    />
                    {/* <MaterialCommunityIcons
                        style={styles.inputIcon}
                        name="clock-outline"
                        size={24}
                    /> */}
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
        marginBottom: 15,
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
    inputField: {
        flex: 1,
    },
    inputIcon: {
        marginRight: 8,
    },
});

function formatDateToMonthDayYear(d: Date) {
    // Note that Date.getMonth() returns zero-based values, hence +1
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function formatDateToHoursMinutes(d: Date) {
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
