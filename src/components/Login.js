import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData, handleFakeData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect, NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/lib/fa'

class LogIn extends Component {
  state = {
    id: '',
    toHome: false,
  }
	componentDidMount() {
		const { dispatch, authedUser } = this.props
		if (authedUser === null) {
			dispatch(handleFakeData())
		}
	}
  handleNameChange = (e) => {
    const id = e.target.value

    this.setState(() => ({
      id
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { id } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
    this.setState(() => ({
      id: '',
      toHome: true,
    }))
  }
  render () {
    const { id, toHome } = this.state
		const { userIds, users, authedUser } = this.props

    if (toHome === true) {
      return <Redirect to='/' />
    }

		console.log(authedUser)
    return (
			<div className='container'>
				<NavLink to='/'><FaArrowLeft className='back-button mt-2' /></NavLink>
        <h2 className='text-center pt-5 pb-3'>Log in to Start Reviewing</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="name">Name</label>
						<select className='form-control' onChange={this.handleNameChange}>
							<option value='' disabled>Name</option>
							{userIds.map((id) => (
								<option key={id} value={id}>{users[id].name}</option>
							))}
						</select>
          </div>
          	<button className='btn btn-primary w-100' type='submit' disabled={id === ''}>Login</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    userIds: Object.keys(users),
		users,
		authedUser,
  }
}

export default connect(mapStateToProps)(LogIn)
