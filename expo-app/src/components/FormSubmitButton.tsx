import { FormikHandlers, FormikState, FormikValues } from 'formik';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { RoundedButton } from './RoundedButton';

export const FORM_SUBMIT_BUTTON_TEXT = 'Submit';

interface FormSubmitButtonProps {
    handleSubmit: FormikHandlers['handleSubmit'];
    isSubmitting: FormikState<FormikValues>['isSubmitting'];
    title?: string;
}

export function FormSubmitButton({ handleSubmit, isSubmitting, title }: FormSubmitButtonProps) {
    const buttonText = useMemo(() => (title ? title : FORM_SUBMIT_BUTTON_TEXT), [title]);

    return (
        <View>
            <RoundedButton
                disabled={isSubmitting}
                loading={isSubmitting}
                mode="contained"
                onPress={handleSubmit}
            >
                {buttonText}
            </RoundedButton>
        </View>
    );
}
