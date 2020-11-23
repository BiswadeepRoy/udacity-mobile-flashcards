import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'

class AddDeck extends Component {

    state = {
        title: ''
    }

    changeTitle = (title) => {
        this.setState({
            title: title
        })
    }

    submitDeck = (event) => {
        event.preventDefault()
        if (this.state.title === '') {
            alert('Please enter a title for your deck')
        }
        else {
            this.props.dispatch(addNewDeck(this.state.title))
            const title = this.state.title
            this.setState({
                title: ''
            })
            this.props.navigation.navigate("Add New Card", { title: title, cards: 0 })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                        behavior="padding">
                        <Text style={{ fontSize: 20 }}>Deck Name</Text>
                        <View style={styles.input}>
                            <TextInput style={{ padding: 10 }} value={this.state.title} placeholder="Enter the new deck name" onChangeText={this.changeTitle} />
                        </View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={(event) => this.submitDeck(event)}>
                            <Text style={styles.submitButtonText}> Generate </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
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

const mapStateToProps = ({ decks }) => {
    return { decks }
}

export default connect(mapStateToProps)(AddDeck)