import { setDummyDecks, fetchDecks, addDeck, deleteDeck, editQuestion } from '../utils/helpers'

export const FETCH_DATA = 'FETCH_DATA'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'

export function fetchData(dummyData) {
    if (dummyData) {
        return (dispatch) => {
            setDummyDecks().then(() => {
                fetchDecks()
                    .then(decks => {
                        dispatch({
                            type: FETCH_DATA,
                            decks
                        })
                    })
            })
        }
    }
    else {
        return (dispatch) => {
            fetchDecks()
                .then(decks => {
                    dispatch({
                        type: FETCH_DATA,
                        decks
                    })
                })
        }
    }

}


export function addNewDeck(title) {
    return (dispatch) => {
        addDeck(title).then(() => fetchDecks()
            .then(decks => {
                dispatch({
                    type: ADD_DECK,
                    decks
                })
            })
        )
    }
}

export function deleteExistingDeck(title) {
    return (dispatch) => {
        deleteDeck(title).then(() => fetchDecks()
            .then(decks => {
                dispatch({
                    type: DELETE_DECK,
                    decks
                })
            })
        )
    }
}

export function addNewQuestion({ title, question, correctAnswer, wrongAnswer }) {
    return (dispatch) => {
        editQuestion({ title, question, correctAnswer, wrongAnswer }, false).then(() => fetchDecks()
            .then(decks => {
                dispatch({
                    type: ADD_QUESTION,
                    decks
                })
            })
        )
    }
}

export function deleteQuestion({ title, question, correctAnswer, wrongAnswer }) {
    return (dispatch) => {
        editQuestion({ title, question, correctAnswer, wrongAnswer }, true).then(() => fetchDecks()
            .then(decks => {
                dispatch({
                    type: DELETE_QUESTION,
                    decks
                })
            })
        )
    }
}