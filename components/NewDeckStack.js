
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import AddQuestion from './AddQuestion'
import RunQuiz from './RunQuiz'

const Stack = createStackNavigator();

export default function NewDeckStack({ navigation }) {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Add New Deck"
                component={AddDeck}
                options={{
                    title: 'New Deck',
                    headerStyle: {
                        backgroundColor: 'darkgreen',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center'
                    },
                }}
            />
            <Stack.Screen
                name="Add New Card"
                component={AddCard}
                options={{
                    title: 'Deck',
                    headerStyle: {
                        backgroundColor: 'darkgreen',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center'
                    },
                }}
            />
            <Stack.Screen
                name="Add New Question"
                component={AddQuestion}
                options={{
                    title: 'Add Question',
                    headerStyle: {
                        backgroundColor: 'darkgreen',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center'
                    },
                }}
            />
            <Stack.Screen
                name="Run Quiz"
                component={RunQuiz}
                options={{
                    title: 'Quiz',
                    headerStyle: {
                        backgroundColor: 'darkgreen',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center'
                    },
                }}
            />
        </Stack.Navigator>
    )
}