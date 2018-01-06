import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE_KEY'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      if (result === null) {
        return { }
      }

      return JSON.parse(result)
    })
}

export function addDeck (title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}
