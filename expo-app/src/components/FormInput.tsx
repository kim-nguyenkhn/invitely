import { FormikHandlers } from 'formik';
import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Caption, Text, TextInput } from 'react-native-paper';

interface FormInputProps {
    errorMessage: string;
    label: string;
    handleChangeText: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    touched: boolean;
    value: string;
}

/**
 * A FormInput is a custom TextInput that does not use the floating label.
 * Instead, it has an accompanying <Text> element that functions as a label.
 */
export function FormInput({
    errorMessage,
    label,
    handleChangeText,
    handleBlur,
    touched,
    value,
}: FormInputProps) {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                error={!!(touched && errorMessage)}
                mode="outlined"
                onChangeText={handleChangeText}
                onBlur={handleBlur}
                value={value}
            />
            {touched && errorMessage && (
                <Caption style={styles.errorMessage}>{errorMessage}</Caption>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
    },
    label: {
        marginBottom: 16,
    },
    errorMessage: {
        color: 'red',
    },
});
