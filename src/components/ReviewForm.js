import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleEditReview } from '../actions/reviews'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import { Redirect, NavLink } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { FaStar, FaArrowLeft } from 'react-icons/lib/fa'

class ReviewForm extends Component {
  state = {
		review: '',
    reviewBody: '',
		reviewRating: 0,
		toHome: false,
  }

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.review !== prevState.review) {
    	return {
				review: nextProps.review,
				reviewBody: nextProps.review.body,
      	reviewRating: Math.round(nextProps.review.rating),
     	};
    }

   	// Otherwise, do not update state
    return null;
  }

	handleStarClick = (num) => {
		this.setState(() => ({
			reviewRating: num,
		}))
	}

  handleReviewChange = (e) => {
    const reviewBody = e.target.value

    this.setState(() => ({
      reviewBody,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { reviewRating, reviewBody, review } = this.state
    const { dispatch, authedUser } = this.props
    const reviewObj = {
			reviewRating,
			reviewBody,
			author: authedUser,
			id: review.id,
		}

    if (!reviewRating || !reviewBody) {
        return
    }

		dispatch(handleEditReview(reviewObj))
			.then(setTimeout(() => {
			    const { errorMessage } = this.props
			    if (!errorMessage) {
			        this.setState(() => ({
			          toHome: true,
			        }))
			    }
			}), 4)
  }

  render () {
    const { reviewRating, reviewBody, toHome } = this.state
    const { successMessage, errorMessage, authedUser, user, isFetching } = this.props

    if (!authedUser) {
        return <Redirect to='/login' />
    }

		if (toHome === true) {
      return <Redirect to='/' />
    }

		const stars = []
		for (let i = 1; i < 6; i++) {
			stars.push(i)
		}

		const colorStarStyle = (num, reviewRating) => (
			reviewRating >= num ? 'rating-colored' : null
		)

    return (
      <div className='container'>
				<NavLink to='/'><FaArrowLeft className='back-button mt-2' /></NavLink>
        <h2 className='text-center pt-5 pb-3'>Edit Review</h2>
				<h4>{user.name}</h4>
				<div className='d-flex justify-content-between form-star-size'>
					{stars.map((item, index) => (
						<a key={index} onClick={() => this.handleStarClick(item)} >
							<FaStar className={colorStarStyle(item, reviewRating)} />
						</a>
					))}
				</div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
              <textarea type='text' className='form-control' placeholder='Review' rows='6' value={reviewBody} onChange={this.handleReviewChange} />
          </div>
          <div className='loading-btn-container'>
              <button type="submit" className='w-100 btn btn-primary btn-fixed'>
                  Submit
              </button>
              {isFetching && <LoadingSpinner />}
          </div>
          <div className='d-flex flex-column align-items-center'>
              {successMessage && <FetchSuccess message={successMessage} />}
              {errorMessage && <FetchError message={errorMessage} />}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users, errorMessage, authedUser, isFetching, successMessage, reviews }) {
  const user = users[authedUser]
	const url = window.location.href
	const id = url.split('edit/')[1]
	const review = reviews[id]
	console.log(review)

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
		review,
    user,
  }
}

export default connect(mapStateToProps)(ReviewForm)
