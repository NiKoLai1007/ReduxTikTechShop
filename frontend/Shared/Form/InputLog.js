import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

const InputLog = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 60,
        backgroundColor: 'white',
        margin: 10,
        marginTop: 23,
        borderRadius: 60,
        padding: 10,
        borderWidth: 2,
        borderColor: '#F6BE00',
    },
});

export default InputLog;