import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
	// create-react-app --> gives use the condensed constructor function
	state = {
		showReview: false
	};

	renderContent() {
		if (this.state.showReview) {
			return (
				<SurveyReview
					onCancel={() => this.setState({ showReview: false })}
				/>
			);
		}
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'surveyForm' // default when you leave commponent remove all data in surveyform
	// trick to keep child components from dumping data when they switch between there components
	// when you leave parent dump data, child ok...
})(SurveyNew);
