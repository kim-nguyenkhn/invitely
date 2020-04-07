import { FormikHandlers } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, IconButton, TextInput } from 'react-native-paper';

import { InvitelyTheme } from '../theme';

interface FormInputProps {
    errorMessage: string;
    fieldName: string;
    label: string;
    handleChangeText: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
    startAdornment?: React.ReactElement;
    touched: boolean;
    value: string;
}

export function FormInput({
    errorMessage,
    fieldName,
    label,
    handleChangeText,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    startAdornment,
    touched,
    value,
}: FormInputProps) {
    const clearTextInput = () => {
        setFieldValue(fieldName, '');
        setFieldTouched(fieldName, false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {React.cloneElement(startAdornment, {
                    style: { marginRight: 16 },
                })}
                <TextInput
                    error={!!(touched && errorMessage)}
                    mode="flat"
                    onChangeText={handleChangeText}
                    onBlur={handleBlur}
                    placeholder={label}
                    style={styles.inputElement}
                    underlineColor={InvitelyTheme.colors.inputsAndButtons}
                    value={value}
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
            <View>
                {touched && errorMessage && (
                    <Caption style={styles.errorMessage}>{errorMessage}</Caption>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputElement: {
        backgroundColor: InvitelyTheme.colors.background,
        flex: 1,
        height: 36,
        paddingHorizontal: 0,
    },
    errorMessage: {
        color: 'red',
    },
});
