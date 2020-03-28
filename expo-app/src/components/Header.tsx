import React from "react";
import { Card } from "react-native-paper";

interface HeaderProps {
    children: string;
}

export function Header({ children }: HeaderProps) {
    return <Card.Title title={children} />
}