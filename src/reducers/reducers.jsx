import { combineReducers } from 'redux'
import { todos, visibilityFilter } from './todoAppReducers'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
