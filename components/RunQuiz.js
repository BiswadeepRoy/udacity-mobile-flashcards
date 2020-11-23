import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class RunQuiz extends Component {

    state = {
        deck: this.props.route.params.deck,
        question: this.props.route.params.deck.questions[0].question,
        answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[0].correctAnswer : this.props.route.params.deck.questions[0].wrongAnswer,
        score: 0,
        count: 0
    }

    checkCorrect = (event) => {
        event.preventDefault()
        if (this.state.deck.questions[this.state.count].correctAnswer === this.state.answer && this.state.deck.questions.length > (this.state.count + 1)) {
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[currentState.count + 1].correctAnswer : this.props.route.params.deck.questions[currentState.count + 1].wrongAnswer,
                    score: currentState.score + 1,
                    count: currentState.count + 1
                }
            })
        }
        else if (this.state.deck.questions[this.state.count].correctAnswer !== this.state.answer && this.state.deck.questions.length > (this.state.count + 1)) {
            this.count++
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[currentState.count + 1].correctAnswer : this.props.route.params.deck.questions[currentState.count + 1].wrongAnswer,
                    score: currentState.score,
                    count: currentState.count + 1
                }
            })
        }
        else if (this.state.deck.questions.length === (this.state.count + 1)) {
            this.setState((currentState) => {
                return ({
                    deck: {},
                    question: '',
                    answer: '',
                    score: currentState.deck.questions[currentState.count].correctAnswer === currentState.answer ? currentState.score + 1 : currentState.score, count: currentState.count,
                    count: currentState.count + 1
                })
            })
        }
    }

    checkWrong = (event) => {
        event.preventDefault()
        if (this.state.deck.questions[this.state.count].wrongAnswer === this.state.answer && this.state.deck.questions.length > (this.state.count + 1)) {
            this.count++
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[currentState.count + 1].correctAnswer : this.props.route.params.deck.questions[currentState.count + 1].wrongAnswer,
                    score: currentState.score + 1,
                    count: currentState.count + 1
                }
            })
        }
        else if (this.state.deck.questions[this.state.count].wrongAnswer !== this.state.answer && this.state.deck.questions.length > (this.state.count + 1)) {
            this.count++
            this.setState((currentState) => {
                return {
                    deck: currentState.deck,
                    question: this.props.route.params.deck.questions[currentState.count + 1].question,
                    answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[currentState.count + 1].correctAnswer : this.props.route.params.deck.questions[currentState.count + 1].wrongAnswer,
                    score: currentState.score,
                    count: currentState.count + 1
                }
            })
        }
        else if (this.state.deck.questions.length === (this.state.count + 1)) {
            this.setState((currentState) => {
                return ({
                    deck: {},
                    question: '',
                    answer: '',
                    score: currentState.deck.questions[currentState.count].wrongAnswer === currentState.answer ? currentState.score + 1 : currentState.score,
                    count: currentState.count + 1
                })
            })
        }
    }

    restartQuiz = (event) => {
        event.preventDefault()
        this.setState(
            {
                deck: this.props.route.params.deck,
                question: this.props.route.params.deck.questions[0].question,
                answer: Math.random() < 0.5 ? this.props.route.params.deck.questions[0].correctAnswer : this.props.route.params.deck.questions[0].wrongAnswer,
                score: 0,
                count: 0
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
                {this.state.question === '' ?
                    <Text style={{ color: 'black', fontSize: 20 }}>Your score is :</Text> :
                    <Text style={{ color: 'black', fontSize: 20 }}>{this.state.question}</Text>}

                {this.state.answer === '' ?
                    <Text style={{ color: 'black', fontSize: 15 }}>{this.state.score} / {this.state.count}</Text>
                    : <Text style={{ color: 'black', fontSize: 15 }}>{this.state.answer}</Text>}

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
                        onPress={(event) => this.checkCorrect(event)}>
                        <Text style={styles.submitButtonText}> Correct </Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.wrongButton}
                            onPress={(event) => this.checkWrong(event)}>
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
    }
})

const mapStateToProps = ({ decks }) => {
    return { decks }
}

export default connect(mapStateToProps)(RunQuiz)