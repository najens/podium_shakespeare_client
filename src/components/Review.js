import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDeleteReview } from '../actions/reviews'
import { getMonthDayYear } from '../utils/time'
import { FaStar, FaEllipsisH} from 'react-icons/lib/fa'
import { NavLink } from 'react-router-dom'

class Review extends Component {
	state = {
		review: {},
		date: null,
		formattedDate: null,
		open: false,
	}

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.review.publish_date !== prevState.date) {
    	return {
				date: nextProps.review.publish_date,
				formattedDate: getMonthDayYear(nextProps.review.publish_date)
     	}
    }
   	// Otherwise do not update state
    return null;
  }

	toggleModal = () => {
    this.setState((prevState) => ({
			open: !prevState.open
		}))
  }

	handleDelete = (e) => {
		const { dispatch, review, errorMessage } = this.props
		const id = review.id
		dispatch(handleDeleteReview(id))
			.then(() => {
				if (!errorMessage) {
						this.setState(() => ({
							toHome: true,
						}))
				}
			})
	}

  render() {
    const { review, author, authedUser } = this.props
		const { formattedDate, open } = this.state
		const reviewRating = Math.round(review.rating)
		const colorStarStyle = (num, reviewRating) => (
			reviewRating > num ? 'rating-colored' : null
		)

    return (
      <div>
				<div className='d-flex justify-content-between'>
					<div className='review-author'>{author.name}</div>
					<a onClick={this.toggleModal} className='pl-3 pb-3'>
						<FaEllipsisH className='ellipsis-size'/>
					</a>
				</div>
				<div className='d-flex align-items-center mb-3'>
					<div className='rating-uncolored review-star-size'>
						<FaStar className={colorStarStyle(0, reviewRating)} />
						<FaStar className={colorStarStyle(1, reviewRating)} />
						<FaStar className={colorStarStyle(2, reviewRating)} />
						<FaStar className={colorStarStyle(3, reviewRating)} />
						<FaStar className={colorStarStyle(4, reviewRating)} />
					</div>
					<div className='ml-4 review-date'>{formattedDate}</div>
				</div>
				<p>{`This is where the body will go after
						I reset the database back to the api
						instead of the fake database.`}
				</p>
				{open &&
					<div id="myModal" className="modal">
  					<div className="modal-content">
							<div className='d-flex justify-content-end'>
								<span className="close" onClick={this.toggleModal}>&times;</span>
							</div>
							<div className='list-group'>
								{review.author === authedUser
									? <div>
											<NavLink className='list-group-item' to={`/edit/${review.id}`}>Edit Review</NavLink>
											<a className='list-group-item' onClick={this.toggleModal}>Delete Review</a>
										</div>
									: <a className='list-group-item' onClick={this.toggleModal}>Report Review</a>
								}
							</div>
  					</div>
					</div>
				}
      </div>
    );
  }
}

// Get the current review and author
function mapStateToProps ({ reviews, users, authedUser, errorMessage }, {id}) {
  const review = reviews[id]
	const authorId = review.author
	const author = users[authorId]

  return {
    review,
		author,
		authedUser,
		errorMessage,
  }
}

export default connect(mapStateToProps)(Review);
