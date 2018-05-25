import { FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE, FETCH_REVIEW_REQUEST, FETCH_REVIEW_SUCCESS,
  FETCH_REVIEW_FAILURE, FETCH_EDIT_REVIEW_REQUEST,
  FETCH_EDIT_REVIEW_SUCCESS, FETCH_EDIT_REVIEW_FAILURE,
  FETCH_DELETE_REVIEW_REQUEST, FETCH_DELETE_REVIEW_SUCCESS,
  FETCH_DELETE_REVIEW_FAILURE
} from '../actions/reviews'

const isFetching = (state = false, action) => {
  switch(action.type) {
    case FETCH_REVIEWS_REQUEST :
    case FETCH_REVIEW_REQUEST :
    case FETCH_EDIT_REVIEW_REQUEST :
    case FETCH_DELETE_REVIEW_REQUEST :
      return true
    case FETCH_REVIEWS_SUCCESS :
    case FETCH_REVIEWS_FAILURE :
    case FETCH_REVIEW_SUCCESS :
    case FETCH_REVIEW_FAILURE :
    case FETCH_EDIT_REVIEW_SUCCESS :
    case FETCH_EDIT_REVIEW_FAILURE :
    case FETCH_DELETE_REVIEW_SUCCESS :
    case FETCH_DELETE_REVIEW_FAILURE :
      return false
    default :
      return state
  }
}

export default isFetching