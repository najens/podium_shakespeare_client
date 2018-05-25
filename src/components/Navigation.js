import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'


class Navigation extends Component {
	state = {
    collapsed: true
  };

	toggleNavBar = () => {
    this.setState((prevState) => ({
			collapsed: !prevState.collapsed
		}))
  }

	handleLogout = () => {
		const { dispatch, authedUser } = this.props
    dispatch(removeAuthedUser(authedUser))
		this.toggleNavBar()
	}

	render() {
		const { collapsed } = this.state
		return (
			<div className="pos-f-t">
				<nav className="navbar navbar-dark bg-dark">
			    <button className="navbar-toggler" onClick={this.toggleNavBar} type="button">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			  </nav>
				{!collapsed &&
					<div>
						<div className="bg-dark p-4 d-flex flex-column">
							<NavLink to='/login' onClick={() => this.toggleNavBar()} className="text-white pb-2">Log in</NavLink>
							<NavLink to='/' onClick={this.handleLogout} className="text-white">Log out</NavLink>
						</div>
					</div>
				}
			</div>
		)
	}
}

export default connect()(Navigation)
