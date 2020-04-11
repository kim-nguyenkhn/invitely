import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContentContainerProps {
    children: React.ReactNode;
}

function ContentContainer({ children }: ContentContainerProps) {
    return <View style={styles.contentContainer}>{children}</View>;
}

export default ContentContainer;

const styles = StyleSheet.create({
    contentContainer: {
        height: '100%',
        paddingLeft: 32,
        paddingRight: 32,
    },
});
