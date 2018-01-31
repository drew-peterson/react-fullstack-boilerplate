import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeColor } from '../styles/themeColor';
import { ThemeProvider } from 'styled-components';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	// preferred location for intial ajax request w/ new react
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<ThemeProvider theme={ThemeColor}>
				<BrowserRouter>
					<div className="container">
						<Header />
						{/* exact is telling route to match exactly...*/}
						{/* could use <switch> here instead of exact*/}
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route
							exact
							path="/surveys/new"
							component={SurveyNew}
						/>
					</div>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default connect(null, actions)(App);
