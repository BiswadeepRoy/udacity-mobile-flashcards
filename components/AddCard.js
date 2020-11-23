import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { deleteExistingDeck } from '../actions'

class AddCard extends Component {

    addNewQuestion = (event) => {
        event.preventDefault()
        this.props.navigation.navigate("Add New Question", { title: this.props.route.params.title })
    }

    runQuiz = (event) => {
        event.preventDefault()
        this.props.navigation.navigate("Run Quiz", { deck: this.props.decks[this.props.route.params.title] })
    }

    deleteDeck = (event) => {
        event.preventDefault()
        this.props.dispatch(deleteExistingDeck(this.props.route.params.title))
        this.props.navigation.goBack()
    }
    render() {
        const title = this.props.route.params.title
        let cards = this.props.route.params.cards
        cards = typeof this.props.decks[title] === 'undefined' ? cards : this.props.decks[title].questions.length
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>{title}</Text>
                    <Text>{cards} card(s)</Text>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={(event) => this.addNewQuestion(event)}>
                        <Text style={styles.submitButtonText}> Add Cards </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={(event) => this.runQuiz(event)}
                        disabled={cards > 0 ? false : true}>
                        <Text style={{ color: cards > 0 ? 'white' : 'grey' }}> Start Quiz </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(event) => this.deleteDeck(event)}>
                        <Text style={{ fontSize: 12, color: 'red' }}> Delete Deck </Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: 'darkgreen',
        padding: 10,
        margin: 15,
        height: 40,
        width: 100,
        alignItems: 'center',

    },

    submitButtonText: {
        color: 'white'
    }
})

const mapStateToProps = ({ decks }) => {
    return { decks }
}

export default connect(mapStateToProps)(AddCard)