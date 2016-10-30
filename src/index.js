import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'

import { todos, visibilityFilter } from './todoAppReducers'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp)

const { Component } = React

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    >
      {children}
    </a>
  )
}

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      )
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      )
    default:
      return todos
  }
}

let nextTodoId = 0
class TodoApp extends Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    )
    return (
      <div>
        <input ref={node => {
          this.input = node
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          })
          this.input.value = ''
        }}
        >
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                })
              }}
              style={{
                textDecoration:
                  todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:{' '}
          <FilterLink filter='SHOW_ALL'
                      currentFilter={this.props.visibilityFilter}
          >
            All
          </FilterLink>{' '}
          <FilterLink filter='SHOW_ACTIVE'
                      currentFilter={this.props.visibilityFilter}
          >
            Active
          </FilterLink>{' '}
          <FilterLink filter='SHOW_COMPLETED'
                      currentFilter={this.props.visibilityFilter}
          >
            Completed
          </FilterLink>{' '}
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  )
}

store.subscribe(render)

render()
