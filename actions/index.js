import * as API from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

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

export const removeDeck = (title) => (dispatch) => {
  return API.removeDeck(title).then(() => {
    dispatch({
      type: REMOVE_DECK,
      title
    })
  })
}

export const addCard = (title, card) => (dispatch) => {
  return API.addCard(title, card).then(() => {
    dispatch({
      type: ADD_CARD,
      title,
      card
    })
  })
}
