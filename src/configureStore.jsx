import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers/reducers'
import { loadState, saveState } from './localStorage'

const configureStore =() => {
  const persistedState = loadState()

  const store = createStore(
    todoApp,
    persistedState,
  )

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
