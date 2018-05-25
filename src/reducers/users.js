import { FETCH_REVIEWS_SUCCESS } from '../actions/reviews'

export default function users (state = {}, action) {
  switch(action.type) {
    case FETCH_REVIEWS_SUCCESS :
      return {
      	...state,
        ...action.users
      }
    default :
      return state
  }
}
