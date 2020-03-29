import { FormikHandlers, FormikValues } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CustomColors } from '../theme';

interface ViewWithBackgroundProps {
    handleChange: FormikHandlers['handleChange'];
    values: FormikValues;
}

export function ViewWithBackground({
    handleChange,
    values,
}: ViewWithBackgroundProps) {
    const handleColorChange = color => {
        handleChange(CustomColors.Peach);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleColorChange}>
            {/* TODO: Use <ImageBackground> later */}
            <View
                style={{
                    backgroundColor: values.color,
                    height: 200,
                    width: '60%',
                }}
            />
            <View style={styles.textContent}>
                <Text>{values.name}</Text>
                <Text>{values.startTime.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    textContent: {
        position: 'absolute',
    },
});
