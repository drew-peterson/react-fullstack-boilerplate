import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeColor } from "../styles/themeColor";
import { ThemeProvider } from "styled-components";
import * as actions from "../actions";

// import "../styles/normalize.css";

import Header from "./Header";
import Landing from "./Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

class App extends Component {
  // preferred location for intial ajax request w/ new react
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <ThemeProvider theme={ThemeColor}>
        <BrowserRouter>
          {/* <div className="container"> */}
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
