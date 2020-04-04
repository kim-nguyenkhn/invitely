import React from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

export function FormSubmitButton({ handleSubmit, isSubmitting }) {
    return (
        <Button disabled={isSubmitting} mode="contained" onPress={handleSubmit}>
            {isSubmitting ? <ActivityIndicator /> : 'Submit'}
        </Button>
    );
}
