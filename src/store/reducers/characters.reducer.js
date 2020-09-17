import { SET_CHARACTERS } from '../actions/characters.action'

const initialState = {
  results: [],
  loading: false,
  total: 0,
  error: null,
}

export default function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        ...action.payload,
        error: action.payload?.error || null,
      }
    default:
      return state
  }
}
