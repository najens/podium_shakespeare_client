import { combineReducers } from 'redux'
import users from './users'
import authedUser from './authedUser'
import isFetching from './isFetching'
import errorMessage from './errorMessage'
import successMessage from './successMessage'
import reviews from './reviews'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  authedUser,
  isFetching,
  errorMessage,
  successMessage,
  reviews,
  loadingBar: loadingBarReducer,
})
