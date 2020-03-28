import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card } from 'react-native-paper';

export function CreateEventScreen({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Cancel</Button>,
            headerRight: () => <Button onPress={() => console.log('nothing happens')}>Save draft</Button>
        });
    }, [])

    return (
        <View>
            <Card.Title title="Create an event" />
        </View>
    )
}

const styles = StyleSheet.create({});
