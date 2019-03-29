import React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 35,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#fa8231'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3
    }
})

export default props => {
    const stylesToSet = [styles.button]

    if (props.double) stylesToSet.push(styles.buttonDouble)
    if (props.triple) stylesToSet.push(styles.buttonTriple)
    if (props.operation) stylesToSet.push(styles.operationButton)

    return (
        <TouchableHighlight onPress={() => props.click && props.click(props.label)}>
            <Text style={stylesToSet}>{props.label}</Text>
        </TouchableHighlight>
    )
}