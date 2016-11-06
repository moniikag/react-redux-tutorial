import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(
        t => t.completed
      )
    case 'active':
      return todos.filter(
        t => !t.completed
      )
    default:
      return todos
  }
}

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state.todos,
    params.filter || 'all',
  )
})

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // we can just pass a configuration object when payload is the same
  { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
