import { v4 } from 'node-uuid'
import { getIsFetching } from '../reducers'
import * as api from '../api'

const receiveTodos =(filter, response) => ({
})

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch({
    type: 'REQUEST_TODOS',
    filter,
  })

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'RECEIVE_TODOS',
        filter,
        response,
      })
    }
  )
}

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
