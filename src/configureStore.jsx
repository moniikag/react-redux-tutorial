import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
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

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

const configureStore =() => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)

  store.dispatch = addPromiseSupportToDispatch(store)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }


  // save state on any store change
  // save only data (todos), not the application state (filter)
  // throttle ensures that the function is not called more often than specified in ms
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 1000))

  return store
}

export default configureStore
