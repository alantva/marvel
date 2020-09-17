export const FETCH_CHARACTERS = '[characters] Fetch'
export const SET_CHARACTERS = '[characters] Set'

export const fetchCharacters = (data) => ({ type: FETCH_CHARACTERS, payload: data })

export const setCharacters = (data) => ({ type: SET_CHARACTERS, payload: data })
