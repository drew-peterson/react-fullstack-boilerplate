import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        nextProps.history.push({
          pathname: '/login',
          state: { from: nextProps.location } // used to redirect  after login
        });
      }
    }

    render() {
      const { auth } = this.props; // prevent all loading of resource until authed!
      return auth && <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps({ auth }) {
    return { auth };
  }
  return connect(mapStateToProps)(Authentication); // connect Authentication to state...
}
