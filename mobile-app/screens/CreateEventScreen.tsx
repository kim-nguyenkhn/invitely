import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';

export function CreateEventScreen({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Cancel</Button>,
            headerRight: () => <Button onPress={() => console.log('nothing happens')}>Save draft</Button>
        });
    }, [])

    return (
        <View>
            <Text>Henlo, Create Your Event</Text>
        </View>
    )
}

const styles = StyleSheet.create({});
