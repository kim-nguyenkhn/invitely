import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface RoundedButtonProps {
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
    mode?: 'text' | 'outlined' | 'contained' | undefined;
    children?: React.ReactNode;
}

/**
 * RoundedButton is the same thing as a react-native-paper Button, but with Invitely styling.
 */
export function RoundedButton(props: RoundedButtonProps) {
    return (
        <Button {...props} style={styles.roundedButton} uppercase={false}>
            {props.children}
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
