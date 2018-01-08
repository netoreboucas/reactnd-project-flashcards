import { GET_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD, REMOVE_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...action.decks
      }

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }

    case REMOVE_DECK:
      const data = {
        ...state
      }
      data[action.title] = undefined
      delete data[action.title]
      return data

    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [
            ...state[action.title].questions,
            action.card
          ]
        }
      }

    case REMOVE_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.filter((card) => {
            return card.question !== action.card.question || card.answer !== action.card.answer
          })
        }
      }

    default:
      return state
  }
}

export default decks
