import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'
import throttle from 'lodash/throttle'

import { todos, visibilityFilter } from './todoAppReducers'

import AddTodo from './AddTodo'
import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'

import { loadState, saveState } from './localStorage'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

import { Provider } from 'react-redux'
import { createStore } from 'redux'

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

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
