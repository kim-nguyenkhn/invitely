import React from 'react';
import { Button } from 'react-native-paper';

import { InvitelyTheme } from '../theme';

export function AppBarButton({ children, onPress }) {
    return (
        <Button color={InvitelyTheme.colors.textLight} onPress={onPress}>
            {children}
        </Button>
    );
}
