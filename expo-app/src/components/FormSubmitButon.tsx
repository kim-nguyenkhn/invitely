import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Button } from 'react-native-paper';

export function FormSubmitButton({ handleSubmit, isSubmitting }) {
    return (
        <Button disabled={isSubmitting} mode="contained" onPress={handleSubmit}>
            {isSubmitting ? <ActivityIndicator /> : 'Submit'}
        </Button>
    );
}
