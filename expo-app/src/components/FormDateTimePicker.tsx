import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Button } from 'react-native-paper';

export function FormDateTimePicker() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker}>Show date picker!</Button>
            </View>
            <View>
                <Button onPress={showTimepicker}>Show time picker!</Button>
            </View>
            {show && (
                <DateTimePicker value={date} mode={mode} display="default" onChange={onChange} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
