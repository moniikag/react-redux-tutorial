import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import todoApp from './reducers'

const configureStore =() => {
  const middlewares = [promise]
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
