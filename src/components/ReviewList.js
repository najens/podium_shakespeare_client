import React, { Component } from 'react'
import { connect } from 'react-redux'
import Review from './Review'

class ReviewList extends Component {
	state = {
		sortBy: 'recentReviewIds',
		recentReviewIds: [],
		reviews: [],
		start: 0,
		index: 10,
		totalPages: null
	}

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.recentReviewIds !== prevState.recentReviewIds) {
    	return {
				recentReviewIds: nextProps.recentReviewIds,
      	reviews: nextProps.recentReviewIds.slice(0, 10),
     	};
    }

   	// Otherwise, do not update state
    return null;
  }

	// Determines how many reviews to load and which sortBy array
	// to use, and then add that number of reviews to the state
	loadReviews = () => {
		const { reviews, start, index, sortBy } = this.state
		const { numReviews } = this.props
		const reviewsToShow = this.sortReviewsBy(sortBy)
		const remaining = numReviews - start + index
		// If there are more results left than the index value,
		// get the reviews from the start to the index
		if (remaining >= index) {
			const reviewsToAdd = reviewsToShow.slice(start, start + index)
			this.setState(() => ({
        reviews: [...reviews, ...reviewsToAdd]
      }))
		}
		// If the remaining results left is between 0 and 10,
		// get the reviews from the start to the remaining
		else if (remaining < index && remaining > 0) {
			const reviewsToAdd = reviewsToShow.slice(start, numReviews)
			this.setState(() => ({
        reviews: [...reviews, ...reviewsToAdd]
      }))
		}
		// Otherwise, return since there are no more reviews to load
		else {
			return
		}
	}

	// Updates the start state and then calls
	// the function to load more reviews
	loadMore = () => {
		this.setState((prevState) => ({
			start: prevState.start + prevState.index
		}), this.loadReviews)
	}

	// Determines which sorted list to show
	// based on the sortBy state
	sortReviewsBy = (sortBy) => {
		const {recentReviewIds, highestRatedIds, lowestRatedIds} = this.props
		switch(sortBy) {
			case 'recent' :
				return recentReviewIds
			case 'highest' :
				return highestRatedIds
			case 'lowest' :
				return lowestRatedIds
			default :
				return recentReviewIds
		}
	}

	// Update the sortBy state and reset
	// the start and reviews list
	handleSelectChange = (e) => {
		const sortBy = e.target.value
		this.setState(() => ({
			sortBy,
			reviews: [],
			start: 0,
		}), this.loadReviews)
	}

  render() {
		const { reviews } = this.state
    return (
			<div>
				<div className='list-group-item d-flex justify-content-between align-items-center'>
					<div className='review-heading'>All Reviews</div>
					<div>
						<select className='form-control' onChange={this.handleSelectChange}>
						  <option value='recent'>Most Recent</option>
						  <option value='highest'>Highest Ratings</option>
						  <option value='lowest'>Lowest Ratings</option>
						</select>
					</div>
				</div>
        <ul className='list-group'>
					{reviews.map((id) => {
							return(
								<li key={id} className='list-group-item'>
		              <Review id={id} />
		            </li>)
	          })
					}
        </ul>
				<div className='d-flex justify-content-around mt-4 mb-4'>
					<a className='btn btn-primary' onClick={this.loadMore}>Show More</a>
				</div>
      </div>
    )
  }
}

// Create sorted arrays of the reviews to toggle on page
function mapStateToProps ({ reviews, authedUser, isFetching }) {
	const numReviews = Object.keys(reviews).length
  return {
		numReviews,
		recentReviewIds: Object.keys(reviews)
			.sort((a, b) => (new Date(reviews[b].publish_date) - new Date(
				reviews[a].publish_date))),
		highestRatedIds: Object.keys(reviews)
			.sort((a, b) => reviews[b].rating - reviews[a].rating),
		lowestRatedIds: Object.keys(reviews)
			.sort((a, b) => reviews[a].rating - reviews[b].rating),
  }
}

export default connect(mapStateToProps)(ReviewList);
