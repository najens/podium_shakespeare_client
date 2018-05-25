import * as api from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import generateUID from '../utils/user'

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST'
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS'
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE'
export const FETCH_REVIEW_REQUEST = 'FETCH_REVIEW_REQUEST'
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS'
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE'
export const FETCH_EDIT_REVIEW_REQUEST = 'FETCH_EDIT_REVIEW_REQUEST'
export const FETCH_EDIT_REVIEW_SUCCESS = 'FETCH_EDIT_REVIEW_SUCCESS'
export const FETCH_EDIT_REVIEW_FAILURE = 'FETCH_EDIT_REVIEW_FAILURE'
export const FETCH_DELETE_REVIEW_REQUEST = 'FETCH_DELETE_REVIEW_REQUEST'
export const FETCH_DELETE_REVIEW_SUCCESS = 'FETCH_DELETE_REVIEW_SUCCESS'
export const FETCH_DELETE_REVIEW_FAILURE = 'FETCH_DELETE_REVIEW_FAILURE'

export function fetchReviewsRequest() {
	return {
		type: FETCH_REVIEWS_REQUEST
	}
}

export function fetchReviewsSuccess(reviews) {
	const reviewsObj = {}
	const usersObj = {}
	reviews.data.map((review) => {
		const userId = generateUID()
		usersObj[userId] = {
			name: review.author,
			reviews: [review.id]
		}
		const newReviewObj = review
		newReviewObj.author = userId
		reviewsObj[review.id] = newReviewObj
	})
	return {
		type: FETCH_REVIEWS_SUCCESS,
		reviews: reviewsObj,
		users: usersObj,
		message: 'Data retrieved!',
	}
}

export function fetchReviewsFailure(err) {
	return {
		type: FETCH_REVIEWS_FAILURE,
		message: err.message || 'Something went wrong!',
	}
}

export function handleFetchReview(id) {
	return (dispatch) => {

		dispatch(showLoading())
		dispatch({
			type: FETCH_REVIEW_REQUEST,
			id,
		})

		return api.fetchReview(id).then(
			res => {
        dispatch({
					type: FETCH_REVIEW_SUCCESS,
					review: res.data,
					message: 'Review successfully retrieved.'
				})
      },
      err => {
        dispatch({
					type: FETCH_REVIEW_FAILURE,
					message: err.message || 'Something went wrong!'
				})
      }
		).then(() => dispatch(hideLoading()))
	}

}

export function handleEditReview (review) {
    return (dispatch) => {

        dispatch(showLoading())
        dispatch({
            type: FETCH_EDIT_REVIEW_REQUEST,
            review,
        })

        return new Promise((resolve, reject) => resolve({
					id: review.id,
					publish_date: new Date().toString(),
					rating: review.reviewRating,
					body: review.reviewBody,
					author: review.author,
				}))
            .then(
                response => {
                    console.log('THE RESPONSE IS: ', response)
                    if (response.id) {
                        dispatch({
                            type: FETCH_EDIT_REVIEW_SUCCESS,
                            review: response,
                            message: response.success || 'Review edited.',
                        })
                    } else {
                        dispatch({
                            type: FETCH_EDIT_REVIEW_FAILURE,
                            message: response.error || 'Something went wrong',
                        })
                    }
                },
                error => {
                    console.log(typeof(error))
                    dispatch({
                        type: FETCH_EDIT_REVIEW_FAILURE,
                        message: error.TypeError || 'Server Error',
                    })
                }
							)
            .then(() => dispatch(hideLoading()))
    }
}

export function handleDeleteReview (id) {
    return (dispatch) => {

      dispatch(showLoading())
      dispatch({
        type: FETCH_DELETE_REVIEW_REQUEST,
        id,
      })

      return new Promise((resolve, reject) => resolve(id))
        .then(
          response => {
            dispatch({
                type: FETCH_DELETE_REVIEW_SUCCESS,
                id: response,
                message: response.success || 'Review deleted.',
            })
					},
          error => {
            dispatch({
                type: FETCH_DELETE_REVIEW_FAILURE,
                message: error.TypeError || 'Server Error',
            })
          }
				)
      .then(() => dispatch(hideLoading()))
    }
}
