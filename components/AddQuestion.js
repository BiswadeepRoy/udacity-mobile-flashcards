import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import { addNewQuestion } from '../actions'

class AddQuestion extends Component {

    state = {
        question: '',
        answer: '',
    }

    changeQuestion = (question) => {
        this.setState({
            question: question
        })
    }

    changeAnswer = (answer) => {
        this.setState({
            answer: answer
        })
    }

    submitQuestion = (event) => {
        event.preventDefault()
        if (this.state.answer === '' || this.state.question === '') {
            alert('Please enter a question/answer for your deck')
        }
        else {
            this.props.dispatch(addNewQuestion({
                title: this.props.route.params.title,
                question: this.state.question,
                answer: this.state.answer,
            }))
            this.setState({
                question: '',
                answer: '',
            })
            alert('Question has been successfully added')
        }
    }


    render() {
        return (<View style={{ flex: 1, alignSelf: 'stretch' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                    behavior="padding">
                    <Text style={{ fontSize: 20 }}>Add New Question</Text>
                    <View style={styles.input}>
                        <TextInput style={{ padding: 10 }} value={this.state.question} placeholder="Enter the question" onChangeText={this.changeQuestion} />
                    </View>
                    <View style={styles.input}>
                        <TextInput style={{ padding: 10 }} value={this.state.answer} placeholder="Enter the answer" onChangeText={this.changeAnswer} />
                    </View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={(event) => this.submitQuestion(event)}>
                        <Text style={styles.submitButtonText}> Generate </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    input: {
        margin: 15,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        width: 250
    },
    submitButton: {
        backgroundColor: 'darkgreen',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
})


export default connect()(AddQuestion)