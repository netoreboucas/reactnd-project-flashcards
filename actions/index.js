import * as API from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'

export const getDecks = () => (dispatch) => {
  return API.getDecks().then((decks) => {
    dispatch({
      type: GET_DECKS,
      decks
    })
  })
}

export const addDeck = (title) => (dispatch) => {
  return API.addDeck(title).then(() => {
    dispatch({
      type: ADD_DECK,
      title
    })
  })
}
