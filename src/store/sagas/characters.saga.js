// Redux Saga Imports
import { put, call, takeLatest, all } from 'redux-saga/effects'

// Services Imports
import api from '../../services/api'

// Actions Imports
import { FETCH_CHARACTERS, SET_CHARACTERS } from '../actions/characters.action'

// Performs the request in the API to get the characters
function* fetchCharacters(action) {
  try {
    // Predefined settings
    const config = {
      url: '/characters',
      params: { limit: 12, offset: 0 , ...action.payload },
    }
    // Reset data
    yield put({ type: SET_CHARACTERS, payload: { loading: true, results: [] }})
    // Calls the API
    const response = yield call(api, config)
    // Calls the reducer to record in the store
    const { results, total } = response.data.data
    yield put({ type: SET_CHARACTERS, payload: { results, total, loading: false } })
  }
  catch(error) {
    // Calls the reducer to record then error in the store
    console.error('fetchCharacters', error)
    yield put({ type: SET_CHARACTERS, payload: { loading: false, error } })
  }
}

export default function* root() {
  yield all([
    takeLatest(FETCH_CHARACTERS, fetchCharacters)
  ])
}
