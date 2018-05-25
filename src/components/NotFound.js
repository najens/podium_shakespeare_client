import React, { Component } from 'react'

class NotFound extends Component {
  render () {
    return (
      <div className="container mt-5">
				<div className='d-flex flex-column align-items-center'>
					<h3>404</h3>
	        <h4 className='text-danger'>Page not found</h4>
				</div>

      </div>
    )
  }
}

export default NotFound
