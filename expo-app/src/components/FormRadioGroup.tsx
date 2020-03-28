import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Caption, RadioButton } from 'react-native-paper';

export function FormRadioGroup({ errorMessage, label, handleChange, touched, value }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <RadioButton.Group onValueChange={handleChange} value={value}>
                <RadioButton.Item label="Single Day" value="Single" />
                <RadioButton.Item label="Multi Day" value="Multi" />
            </RadioButton.Group>
            {errorMessage && <Caption style={styles.errorMessage}>{errorMessage}</Caption>}
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
