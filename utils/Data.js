export const deckKey = 'KEY_ALL_DECKS'

export const decksData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                correctAnswer: 'A library for managing user interfaces',
                wrongAnswer: 'A method for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                correctAnswer: 'The componentDidMount lifecycle event',
                wrongAnswer: 'The componentDidCatch lifecycle event',   
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                correctAnswer: 'The combination of a function and the lexical environment within which that function was declared.',
                wrongAnswer: 'The combination of a class and the lexical environment within which that function was declared.'
            }
        ]
    }
}
