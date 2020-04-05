import { FormikHandlers, FormikState, FormikValues } from 'formik';
import React, { useMemo } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

export const FORM_SUBMIT_BUTTON_TEXT = 'Submit';

interface FormSubmitButtonProps {
    handleSubmit: FormikHandlers['handleSubmit'];
    isSubmitting: FormikState<FormikValues>['isSubmitting'];
    title?: string;
}

export function FormSubmitButton({
    handleSubmit,
    isSubmitting,
    title,
}: FormSubmitButtonProps) {
    const buttonText = useMemo(
        () => (title ? title : FORM_SUBMIT_BUTTON_TEXT),
        [title]
    );

    return (
        <Button disabled={isSubmitting} mode="contained" onPress={handleSubmit}>
            {isSubmitting ? <ActivityIndicator testID="spinner" /> : buttonText}
        </Button>
    );
}
