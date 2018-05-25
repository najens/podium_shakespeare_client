import * as api from '../utils/api'
import * as data from '../utils/DATA'
import { fetchReviewsRequest, fetchReviewsSuccess,
  fetchReviewsFailure } from './reviews'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

const id = ''

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(fetchReviewsRequest())
    return api.fetchReviews().then(
      res => {
        console.log(res)
        dispatch(fetchReviewsSuccess(res))
      },
      err => {
          dispatch(fetchReviewsFailure(err))
      }
    ).then(() => {
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
    })
  }
}

export function handleFakeData() {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(fetchReviewsRequest())
    return data._getReviews().then(
      res => {
        console.log('Success')
        dispatch(fetchReviewsSuccess(res))
      },
      err => {
          dispatch(fetchReviewsFailure(err))
      }
    ).then(() => {
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
    })
  }
}
