import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'

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
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  })
})

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
