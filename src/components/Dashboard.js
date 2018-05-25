import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewList from './ReviewList'
import ReviewStats from './ReviewStats'
import UserReview from './UserReview'

class Dashboard extends Component {
  render() {

    return (
      <div>
				<ReviewStats />
				<UserReview />
        <ReviewList />
      </div>
    );
  }
}

export default connect()(Dashboard);
