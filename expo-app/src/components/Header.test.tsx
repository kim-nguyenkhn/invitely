import React from 'react';
import { render } from 'react-native-testing-library';

import { Header } from './Header';

it('renders correctly, with text', () => {
    const content = 'Test content';

    const { getByText } = render(<Header>{content}</Header>);

    expect(getByText(content));
});
