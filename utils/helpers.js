
import AsyncStorage from '@react-native-community/async-storage'
import { decksData, deckKey } from './Data'

export function setDummyDecks() {
    return AsyncStorage.setItem(deckKey, JSON.stringify(decksData))
}

export function fetchDecks() {
    return AsyncStorage.getItem(deckKey)
        .then(results => {
            return JSON.parse(results)
        })
}

export function addDeck(title) {
    return AsyncStorage.mergeItem(deckKey, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function editQuestion({ title, question, correctAnswer, wrongAnswer }, doDelete) {
    return fetchDecks(deckKey).then((results) => {
        let questions = results[title].questions
        if (doDelete) {
            questions = questions.filter(questionObj => questionObj.question !== question)
        }
        else {
            questions = questions.concat({
                question,
                correctAnswer,
                wrongAnswer
            })
        }
        return AsyncStorage.mergeItem(deckKey, JSON.stringify({
            [title]: {
                title,
                questions
            }
        }))
    })
}

export function deleteDeck(title) {
    return fetchDecks(deckKey)
        .then((results) => {
            const data = results
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(deckKey, JSON.stringify(data))
        })
}   