import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { InvitelyTheme } from '../theme';

interface RoundedButtonProps {
    color?: string;
    onPress: () => void;
    mode?: 'text' | 'outlined' | 'contained' | undefined;
    children?: React.ReactNode;
}

export function RoundedButton({
    children,
    color = InvitelyTheme.colors.primary,
    onPress,
    mode = 'contained',
}: RoundedButtonProps) {
    return (
        <Button color={color} mode={mode} onPress={onPress} style={styles.roundedButton}>
            {children}
        </Button>
    );
}

const styles = StyleSheet.create({
    roundedButton: {
        justifyContent: 'center',
        borderRadius: 30,
        height: 48,
        marginTop: 24,
    },
});
