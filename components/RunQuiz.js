import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CardFlip from 'react-native-card-flip';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class RunQuiz extends Component {

    state = {
        deck: this.props.route.params.deck,
        question: this.props.route.params.deck.questions[0].question,
        answer: this.props.route.params.deck.questions[0].answer,
        score: 0,
        count: 0,
        isAnswer: false
    }

    checkCorrect = (event, isAnswer) => {
        event.preventDefault()
        clearLocalNotification().then(setLocalNotification)
        if (this.state.deck.questions.length === (this.state.count + 1)) {
            this.setState((currentState) => {
                return ({
                    deck: {},
                    question: '',
                    answer: '',
                    score: currentState.score + 1,
                    count: currentState.count + 1,
                    isAnswer: isAnswer
                })
            })
        }
        else {
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: this.props.route.params.deck.questions[currentState.count + 1].answer,
                    score: currentState.score + 1,
                    count: currentState.count + 1,
                    isAnswer: isAnswer
                }
            })
        }
    }

    checkWrong = (event, isAnswer) => {
        event.preventDefault()
        if (this.state.deck.questions.length === (this.state.count + 1)) {
            clearLocalNotification.then(setLocalNotification)
            this.setState((currentState) => {
                return ({
                    deck: {},
                    question: '',
                    answer: '',
                    score: currentState.score,
                    count: currentState.count + 1,
                    isAnswer: isAnswer
                })
            })
        }
        else {
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: this.props.route.params.deck.questions[currentState.count + 1].answer,
                    score: currentState.score,
                    count: currentState.count + 1,
                    isAnswer: isAnswer
                }
            })
        }
    }

    restartQuiz = (event) => {
        event.preventDefault()
        this.setState(
            {
                deck: this.props.route.params.deck,
                question: this.props.route.params.deck.questions[0].question,
                answer: this.props.route.params.deck.questions[0].answer,
                score: 0,
                count: 0,
                isAnswer: false
            }
        )
    }

    goToDeck = (event) => {
        event.preventDefault()
        this.props.navigation.goBack()
    }

    render() {

        return (<View style={{ flex: 1, alignSelf: 'stretch' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.question === '' && this.state.answer === '' ?
                    <Text style={{ color: 'black', fontSize: 20 }}>Your score is :</Text> :
                    <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >

                        <TouchableOpacity style={styles.card} onPress={() => {
                            this.card.flip()
                            this.setState({
                                isAnswer: true
                            })
                        }} >
                            <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>{!this.state.isAnswer ? 'Q.' : 'Ans:'}</Text>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{!this.state.isAnswer ? this.state.question : this.state.answer}</Text>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>{!this.state.isAnswer ? 'Click to show Answer' : 'Click to show Question'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card} onPress={() => {
                            this.card.flip()
                            this.setState({
                                isAnswer: false
                            })
                        }} >
                            <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>{!this.state.isAnswer ? 'Q.' : 'Ans:'}</Text>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{!this.state.isAnswer ? this.state.question : this.state.answer}</Text>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>{!this.state.isAnswer ? 'Click to show Answer' : 'Click to show Question'}</Text>
                        </TouchableOpacity>
                    </CardFlip>}

                {this.state.answer === '' ?
                    <Text style={{ color: 'black', fontSize: 15 }}>{this.state.score} / {this.state.count}</Text> :
                    <Text style={{ color: 'black', fontSize: 15 }}>{this.state.score} / {this.state.deck.questions.length}</Text>}

                {this.state.answer === '' ?
                    <Text style={{ color: 'black', fontSize: 15 }}></Text> :
                    <Text style={{ color: 'black', fontSize: 15 }}>{this.state.deck.questions.length - (this.state.count + 1)} question(s) remaining</Text>}

                {this.state.answer === '' ?
                    <View><TouchableOpacity
                        style={styles.submitButton}
                        onPress={(event) => this.restartQuiz(event)}>
                        <Text style={styles.submitButtonText}> Restart Quiz </Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={(event) => this.goToDeck(event)}>
                            <Text style={styles.submitButtonText}>Go to Deck </Text>
                        </TouchableOpacity></View>
                    : <View><TouchableOpacity
                        style={styles.rightButton}
                        onPress={(event) => this.checkCorrect(event, false)}>
                        <Text style={styles.submitButtonText}> Correct </Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.wrongButton}
                            onPress={(event) => this.checkWrong(event, false)}>
                            <Text style={styles.submitButtonText}> Incorrect </Text>
                        </TouchableOpacity></View>
                }


                {this.state.answer === '' ?
                    <Text></Text>
                    : <Text>Score : {this.state.score} / {this.state.deck.questions.length}</Text>}

            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    rightButton: {
        backgroundColor: 'green',
        padding: 10,
        margin: 15,
        height: 40,
        width: 100,
        alignItems: 'center',

    },

    submitButton: {
        backgroundColor: 'darkgreen',
        padding: 10,
        margin: 15,
        height: 40,
        width: 100,
        alignItems: 'center',

    },

    wrongButton: {
        backgroundColor: 'red',
        padding: 10,
        margin: 15,
        height: 40,
        width: 100,
        alignItems: 'center',

    },

    submitButtonText: {
        color: 'white'
    },

    cardContainer: {
        height: 250,
        width: 250,
    },

    card: {
        height: 250,
        width: 250,
        backgroundColor: 'darkgreen',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = ({ decks }) => {
    return { decks }
}

export default connect(mapStateToProps)(RunQuiz)