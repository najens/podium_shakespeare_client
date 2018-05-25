import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData, handleFakeData } from '../actions/shared'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import Login from './Login'
import ReviewForm from './ReviewForm'
import Navigation from './Navigation'

class App extends Component {
  componentDidMount () {
		this.props.dispatch(handleFakeData())
	}
  render() {
    const { loading } = this.props
    return (
      <Router>
        <div className='app'>
          <LoadingBar />
          {loading === true
            ? null
            : <Fragment>
                <Navigation />
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/login' component={Login} />
                  <Route path='/edit/:id' component={ReviewForm} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </Fragment>
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
