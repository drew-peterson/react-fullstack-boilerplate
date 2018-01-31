import axios from 'axios';
import _ from 'lodash';
import {
	FETCH_USER,
	FETCH_SURVEYS,
	DELETE_SURVEY,
	SERVER_ERROR,
	SELECTED_SURVEY_ID
} from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	// will return updated user so passing back through fetch user will update user w/ new credits...
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	dispatch({ type: SERVER_ERROR }); // reset error
	try {
		const res = await axios.post('/api/surveys', values);
		history.push('/surveys'); // redirect....
		dispatch({
			type: FETCH_USER,
			payload: res.data
		});
	} catch ({ response }) {
		dispatch({ type: SERVER_ERROR, payload: response.data });
	}
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');
	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data
	});
};

export const selectedSurveyId = surveyId => async dispatch => {
	const res = await axios.get(`/api/surveys/${surveyId}`);

	const { title, subject, body, recipients, _id } = res.data;

	const recipientsString = _.chain(recipients)
		.map(recipient => recipient.email)
		.join(',')
		.value();

	dispatch({
		type: SELECTED_SURVEY_ID,
		payload: {
			title,
			subject,
			body,
			_id,
			recipients: recipientsString
		}
	});
};

export const deleteSurvey = surveyId => async dispatch => {
	const res = await axios.delete(`/api/surveys/${surveyId}`);
	dispatch({
		type: DELETE_SURVEY,
		payload: res.data
	});
};

export const submitSurveyDraft = (values, history) => {
	axios.put(`/api/surveys/draft/${values._id}`, values);
	history.push('/surveys');
	return {
		type: ''
	};
};
