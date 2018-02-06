import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeColor } from '../styles/themeColor';
import { ThemeProvider } from 'styled-components';
import * as actions from '../actions';

// import "../styles/normalize.css";

import Header from './Header';
import Landing from './Landing';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetPassword from '../screens/ResetPassword';
import ForgotPassword from '../screens/ForgotPassword';
import requireAuth from './auth/require_auth';

class App extends Component {
  // preferred location for intial ajax request w/ new react
  // componentDidMount() {
  componentWillMount() {
    this.props.fetchUser(); // check auth...
  }

  render() {
    return (
      <ThemeProvider theme={ThemeColor}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/protected" component={requireAuth(Protected)} />
              <Route path="/resetPassword/:token" component={ResetPassword} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

// If no route is found default here...
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class Protected extends Component {
  render() {
    return (
      <div>
        <h3>Protected Route here...</h3>
      </div>
    );
  }
}

export default connect(null, actions)(App);
