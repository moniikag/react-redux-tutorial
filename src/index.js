import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'

import { todos, visibilityFilter } from './todoAppReducers'

import AddTodo from './AddTodo'
import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'

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

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
