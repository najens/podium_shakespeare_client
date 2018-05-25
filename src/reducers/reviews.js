import { FETCH_REVIEWS_SUCCESS, FETCH_REVIEW_SUCCESS,
 	FETCH_EDIT_REVIEW_SUCCESS, FETCH_DELETE_REVIEW_SUCCESS
} from '../actions/reviews'

export default function reviews (state = {}, action) {
  switch(action.type) {
    case FETCH_REVIEWS_SUCCESS :
      return {
      	...state,
        ...action.reviews
      }
		case FETCH_REVIEW_SUCCESS :
		case FETCH_EDIT_REVIEW_SUCCESS :
			return {
				...state,
        [action.review.id]: action.review,
			}
		case FETCH_DELETE_REVIEW_SUCCESS :
			console.log(state)
			delete state[action.id]
			return {
				state,
			}
    default :
      return state
  }
}
