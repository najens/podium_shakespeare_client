import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewBar from './ReviewBar'
import { FaStar } from 'react-icons/lib/fa'
import shakespeare from '../img/shakespeare.jpg'

class Review extends Component {
	state = {
		reviews: {},
		numRatings: null,
		avgRatingTens: null,
		avgRatingOnes: null,
		distribution: {},
	}

	// Use new static method to derive state from props
	static getDerivedStateFromProps(nextProps, prevState) {
		const numRatings = Object.keys(nextProps.reviews).length
		let sumRatings = 0
		let distribution = {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
		}
		Object.entries(nextProps.reviews).forEach(([key, value]) => {
			sumRatings += value.rating
			const rating = Math.round(value.rating).toString()
			switch(rating) {
				case '0' :
					return distribution['0'] += 1
				case '1' :
					return distribution['1'] += 1
				case '2' :
					return distribution['2'] += 1
				case '3' :
					return distribution['3'] += 1
				case '4' :
					return distribution['4'] += 1
				case '5' :
					return distribution['5'] += 1
				default :
					return
			}
		})
		const avgRating = sumRatings / numRatings
		const avgRatingTens = Math.round(avgRating * 10) / 10
		const avgRatingOnes = Math.round(avgRating)
		// If the props have changed, set new state
		if(nextProps.reviews !== prevState.reviews) {
			return {
				reviews: nextProps.reviews,
				numRatings,
				avgRatingTens,
				avgRatingOnes,
				distribution,
			};
		}

		// Otherwise, do not update state
		return null;
	}

  render() {
    const { numRatings, avgRatingTens, avgRatingOnes, distribution } = this.state
		const maxRatingKey = Object.keys(distribution).reduce((a, b) => distribution[a] > distribution[b] ? a : b);
		const maxRating = distribution[maxRatingKey]
		const colorStarStyle = (num, avgRatingOnes) => (
			avgRatingOnes > num ? 'rating-colored' : null
		)
		const stars = []
		for (let i = 5; i > - 1; i--) {
			stars.push(i)
		}

    return (
      <div className='container mt-2 mb-4'>
				<h2>Shakespeare Reviews</h2>
				<img className='mw-100 w-100 mb-4' src={shakespeare} alt='shakespeare'/>
				<div className='d-flex justify-content-between align-items-center mb-3'>
					<div className='d-flex stat-star-size align-items-center'>
						{avgRatingTens &&
						<div>{avgRatingTens}</div>}
						<div className='ml-2 rating-uncolored'>
							<FaStar className={colorStarStyle(0, avgRatingOnes)} />
							<FaStar className={colorStarStyle(1, avgRatingOnes)} />
							<FaStar className={colorStarStyle(2, avgRatingOnes)} />
							<FaStar className={colorStarStyle(3, avgRatingOnes)} />
							<FaStar className={colorStarStyle(4, avgRatingOnes)} />
						</div>
					</div>
					<div className='stat-review-size'>{`${numRatings} Reviews`}</div>
				</div>

				{stars.map((item, index) => (
       		<ReviewBar
						key={stars.length - 1 - index}
						num={stars.length - 1 - index.toString()}
						maxRating={maxRating}
						distribution={distribution}
					/>
    		))}
      </div>
    );
  }
}

function mapStateToProps ({ reviews, authedUser }) {
  return {
		reviews,
		authedUser,
  }
}

export default connect(mapStateToProps)(Review);
