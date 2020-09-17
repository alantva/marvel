import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import combinedReducer from './reducers'
import rootSaga from './sagas'

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload }
  } else {
    return combinedReducer(state, action)
  }
}

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]))
  store.sagaTask = rootSaga.map(saga => sagaMiddleware.run(saga))
  return store
}

const wrapper = createWrapper(initStore)

export default wrapper
