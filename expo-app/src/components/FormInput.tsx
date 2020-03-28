import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

/**
 * A FormInput is a custom TextInput that does not use the floating label.
 * Instead, it has an accompanying <Text> element that functions as a label.
 */
export function FormInput({ label, onChangeText, onBlur, value }) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput onChangeText={onChangeText} onBlur={onBlur} value={value} />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 16,
    },
});
