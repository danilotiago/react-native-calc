import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}
export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {...initialState}

        this.addDigit = this.addDigit.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    addDigit(n) {

        // verifica se tem que limpar o display
        const clearDisplay =
            this.state.displayValue === '0' || // nao adiciona zero a esquerda apos um digito > 0
            this.state.clearDisplay

        // nao deixa adicionar o ponto mais de uma vez em um numero caso nao for limpar o display
        // se for limpar o display o ponto deve ser adicionado tambem se for o primeiro elemento
        if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
            return
        }

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n

        this.setState({
            displayValue,
            clearDisplay: false
        })

        if (n !== '.') {
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[this.state.current] = newValue

            this.setState({
                values
            })
        }
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            const current =this.state.current + 1

            this.setState({
                operation,
                current,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            switch (currentOperation) {
                case '+' :
                    values[0] = values[0] + values[1]
                    break
                case '-' :
                    values[0] = values[0] - values[1]
                    break
                case '*' :
                    values[0] = values[0] * values[1]
                    break
                case '/' :
                    values[0] = values[0] / values[1]
                    break
            }
            values[1] = 0

            this.setState({
                displayValue: `${values[0]}`, // sempre setar para string
                values,
                operation: equals ? null : operation, // se for de igual anula, se nao seta a que foi chamada
                current: equals ? 0 : 1, // se for igual seta para a posicao do valor 0, se nao a 1
                clearDisplay: !equals // se nao for igual nao deve zerar o display pois a pos 0 tem valor valido
            })
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <Display value={this.state.displayValue} />
                <View style={styles.buttons}>
                    <Button label="AC" click={this.clearMemory} triple />
                    <Button label="/" click={this.setOperation} operation />
                    <Button label="7" click={this.addDigit} />
                    <Button label="8" click={this.addDigit} />
                    <Button label="9" click={this.addDigit} />
                    <Button label="*" click={this.setOperation} operation />
                    <Button label="4" click={this.addDigit} />
                    <Button label="5" click={this.addDigit} />
                    <Button label="6" click={this.addDigit} />
                    <Button label="-" click={this.setOperation} operation />
                    <Button label="1" click={this.addDigit} />
                    <Button label="2" click={this.addDigit} />
                    <Button label="3" click={this.addDigit} />
                    <Button label="+" click={this.setOperation} operation />
                    <Button label="0" click={this.addDigit} double />
                    <Button label="." click={this.addDigit} />
                    <Button label="=" click={this.setOperation} operation />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
