import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import validateEmails from '../../utils/validateEmails';
import RenderField from './RenderField';
import { parse as queryString } from 'query-string';
import _ from 'lodash'; // lodash is faster....

import formFields from './formFields';

class SurveyForm extends Component {
	componentDidMount() {
		const { sId } = queryString(this.props.location.search);
		if (sId) {
			this.props.selectedSurveyId(sId);
		}
	}

	submitSurveyDraft() {
		const { surveyForm, history } = this.props;
		this.props.submitSurveyDraft(surveyForm.values, history);
	}
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={RenderField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.props.onSurveySubmit)}>
				{this.renderFields()}

				<Link className="red btn-flat white-text" to="/surveys">
					Cancel
				</Link>
				<button
					className="teal btn-flat white-text"
					type="button"
					style={{ marginLeft: '10px' }}
					onClick={() => this.submitSurveyDraft()}
				>
					Save Draft
					<i className="material-icons right">save</i>
				</button>
				<button
					className="teal btn-flat right white-text"
					type="submit"
				>
					Next
					<i className="material-icons right">done</i>
				</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	// try to validate emails w/ ,
	errors.recipients = validateEmails(values.recipients || '');

	// required fields....
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `${name} is required`;
		}
	});

	return errors; // if empty form is valid!
}

function mapStateToProps(state) {
	return {
		surveyForm: state.form.surveyForm,
		initialValues: state.surveys.selectedSurvey
	};
}

// export default reduxForm({
// 	validate,
// 	form: 'surveyForm',
// 	destroyOnUnmount: false // have to refresh broswer to remove form info...
// })(connect(mapStateToProps, actions)(withRouter(SurveyForm)));

// const form = reduxForm({
// 	validate,
// 	form: 'surveyForm'
// });
// export default connect(mapStateToProps, actions)(form(withRouter(SurveyForm)));

SurveyForm = reduxForm({
	form: 'surveyForm',
	validate,
	// enableReinitialize: true,
	destroyOnUnmount: false // have to refresh broswer to remove form info...
})(SurveyForm);

export default connect(mapStateToProps, actions)(withRouter(SurveyForm));
