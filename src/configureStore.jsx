import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import todoApp from './reducers'

const configureStore =() => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger()) // configurable, here default configuration
  }

  return createStore(
    todoApp,
    // persistedState - if you have it,
    applyMiddleware(...middlewares)
  )
}

export default configureStore
