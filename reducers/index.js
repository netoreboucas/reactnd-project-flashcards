import { TEST } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        ...action.test
      }

    default:
      return state
  }
}

export default entries
