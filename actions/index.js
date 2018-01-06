export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'

export const getDecks = () => ({
  type: GET_DECKS
})

export const addDeck = (title) => ({
  type: ADD_DECK,
  title
})
