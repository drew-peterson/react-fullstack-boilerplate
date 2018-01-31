import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // how you redirect have to get history off props and pash around...
import formFields from './formFields';
import * as actions from '../../actions';
import _ from 'lodash';
import Materialize from 'materialize-css/dist/js/materialize.min.js';

// functional component need to pas props
const SurveyReview = ({
	onCancel,
	formValues,
	submitSurvey,
	history,
	errors
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	if (errors) {
		_.each(errors, (value, key) => {
			Materialize.toast(value, 4000, 'red');
		});
	}

	return (
		<div>
			<h5>please confirm your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 btn-flat white-text"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat right white-text"
			>
				Send Survey <i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.surveyForm.values,
		errors: state.serverErrors
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
