import React from 'react';
import { render } from 'react-native-testing-library';

import { AppBarButton } from './AppBarButton';

it('renders correctly, with text', () => {
    const content = 'Test content';
    const mockFunction = jest.fn();

    const { getByText } = render(
        <AppBarButton onPress={mockFunction}>{content}</AppBarButton>
    );

    const wrapper = getByText(content);

    expect(wrapper);
});
