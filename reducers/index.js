import { FETCH_DATA, ADD_DECK, DELETE_DECK, ADD_QUESTION, DELETE_QUESTION } from '../actions'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
        case DELETE_DECK:
            {
                return { decks: action.decks }
            }
        case ADD_DECK:
        case ADD_QUESTION:
        case DELETE_QUESTION:
            {
                return {
                    decks: {
                        ...state.decks,
                        ...action.decks
                    }
                }
            }
        default:
            return state
    }
}