import React from 'react';
import { render } from 'react-native-testing-library';

import { FormSubmitButton, FORM_SUBMIT_BUTTON_TEXT } from './FormSubmitButton';

it('renders correctly, with default text', () => {
    const { getByText } = render(
        <FormSubmitButton
            handleSubmit={() => {
                // empty
            }}
            isSubmitting={false}
            title={FORM_SUBMIT_BUTTON_TEXT}
        />
    );

    expect(getByText(FORM_SUBMIT_BUTTON_TEXT));
});

it('renders correctly, with custom text', () => {
    const content = 'Custom Text';
    const { getByText } = render(
        <FormSubmitButton
            handleSubmit={() => {
                // empty
            }}
            isSubmitting={false}
            title={content}
        />
    );

    expect(getByText(content));
});

it('shows a spinner when submitting', () => {
    const { getByTestId } = render(
        <FormSubmitButton
            handleSubmit={() => {
                // empty
            }}
            isSubmitting={true}
        />
    );

    expect(getByTestId('spinner'));
});
