import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

interface HeaderProps {
    children: string;
    viewStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

export function Header({ children, viewStyle, titleStyle }: HeaderProps) {
    return (
        <Card.Title
            titleStyle={{
                fontSize: 30,
                ...titleStyle,
            }}
            style={{
                marginTop: 35,
                marginBottom: 35,
                ...viewStyle,
            }}
            title={children}
        />
    );
}
