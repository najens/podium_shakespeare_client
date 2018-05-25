import React, { Component } from 'react'
import { connect } from 'react-redux'
import Review from './Review'
import { FaStar } from 'react-icons/lib/fa'
import { NavLink, Redirect } from 'react-router-dom'

class UserReview extends Component {
	state = {
		authedUser: '',
		reviewRating: 0,
		toLogin: false,
		reviews: {},
		reviewId: null
	}

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.reviews !== prevState.reviews) {

    	return {
				authedUser: nextProps.authedUser,
				reviews: nextProps.reviews,
      	reviewId: Object.keys(nextProps.reviews)
					.filter(id => (nextProps.reviews[id].author === nextProps.authedUser))[0],
     	};
    }

   	// Otherwise, do not update state
    return null;
  }

	handleStarClick = (num) => {
		setTimeout(this.setState(() => ({
				reviewRating: num,
			}), this.redirectToLogin()), 5)
	}
	redirectToLogin = () => {
		this.setState(() => ({
			toLogin: true,
		}))
	}
  render() {
		const { authedUser } = this.props
		const { reviewRating, toLogin, reviewId } = this.state
		const colorStarStyle = (num, reviewRating) => (
			reviewRating >= num ? 'rating-colored' : null
		)

		if (toLogin === true) {
      return <Redirect to='/login' />
    }

		const stars = []
		for (let i = 1; i < 6; i++) {
			stars.push(i)
		}

    return (
      <div className='list-group-item'>
				{reviewId
					? <div>
							<header className='review-heading'>My Review</header>
							<Review id={reviewId} />
						</div>
					: <div className='container'>
							{authedUser &&
								<div>{authedUser.name}</div>
							}
							<NavLink to='/login' exact activeClassName='active'>
								<p className='text-center review-prompt'>
									How was your experience?
								</p>
							</NavLink>
							<div className='d-flex justify-content-between user-rating'>
								{stars.map((item, index) => (
									<a key={index} onClick={() => this.handleStarClick(item)} >
										<FaStar className={colorStarStyle(item, reviewRating)} />
									</a>
								))}
							</div>
						</div>
				}
      </div>
    );
  }
}

function mapStateToProps({ reviews, authedUser }) {
	return {
		authedUser,
		reviews,
		// reviewId: authedUser === '' ? null : Object.keys(reviews)
		// 	.filter(id => (reviews[id].author === authedUser))[0],
	}
}

export default connect(mapStateToProps)(UserReview);
