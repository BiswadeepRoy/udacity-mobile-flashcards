
import AsyncStorage from '@react-native-community/async-storage'
import { decksData, deckKey, notificationKey } from './Data'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

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

export function editQuestion({ title, question, answer }, doDelete) {
    return fetchDecks(deckKey).then((results) => {
        let questions = results[title].questions
        if (doDelete) {
            questions = questions.filter(questionObj => questionObj.question !== question)
        }
        else {
            questions = questions.concat({
                question,
                answer
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

function createNotification() {
    return {
        title: 'Attempt a quiz!',
        body: "👋 don't forget to attempt a quiz today!!",
        ios: {
            sound: true,
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(notificationKey)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
    AsyncStorage.getItem(notificationKey)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(8) // Setting on 8 am every morning
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(notificationKey, JSON.stringify(true))
                        }
                    })
            }
        })
}

