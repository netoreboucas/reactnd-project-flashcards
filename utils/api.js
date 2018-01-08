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

export function getDeck (title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      if (result === null) {
        return undefined
      }

      return JSON.parse(result)[title]
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

export function removeDeck (title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCard (title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result)
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title,
          questions: [...decks[title].questions, card]
        }
      }))
    })
}

export function removeCard (title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        ...data,
        [title]: {
          ...data[title],
          questions: data[title].questions.filter((c) => {
            return c.question !== card.question || c.answer !== card.answer
          })
        }
      }))
    })
}
