import React from 'react';
import { Height } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = ({children, title}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: -80,
        // marginBottom: 0,
        width: width,
        height: 800,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
    }
})

export default FormContainer;