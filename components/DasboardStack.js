
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddCard from './AddCard'
import AddQuestion from './AddQuestion'
import RunQuiz from './RunQuiz'
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

export default function DashboardStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
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