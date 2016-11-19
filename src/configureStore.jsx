import { createStore } from 'redux'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

const logger = (store) => {
  return (next) => {
    const next = store.dispatch
    if (!console.group) {
      return next
    }

    return (action) => {
      console.group(action.type)
      console.log('%c prev state', 'color: gray', store.getState())
      console.log('%c action', 'color: blue', action)
      const returnValue = rawDispatch(action)
      console.log('%c next state', 'color: green', store.getState())
      console.groupEnd(action.type)
      return returnValue
    }
  }
}

const promise = (store) => {
  return (next) => {
    const next = store.dispatch
    return (action) => {
      if (typeof action.then === 'function') {
        return action.then(next)
      }
      return next(action)
    }
  }
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  )
}

const configureStore =() => {
  const store = createStore(todoApp, persistedState)
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  middlewares.push(promise(store))

  wrapDispatchWithMiddlewares(store, middlewares)

  return store
}

export default configureStore
