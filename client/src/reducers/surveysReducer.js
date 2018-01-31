import _ from 'lodash';
import {
	FETCH_SURVEYS,
	DELETE_SURVEY,
	SELECTED_SURVEY_ID
} from '../actions/types';

// import { normalize, schema } from 'normalizr';
// const surveySchema = new schema.Entity('surveys', {}, { idAttribute: '_id' });
// const data = normalize(action.payload, [surveySchema]);

// nested data has to be copied at each level:
// https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html#correct-approach-copying-all-levels-of-nested-data

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return {
				...state,
				surveysById: _.keyBy(action.payload, '_id'),
				selectedSurvey: null
			};
		case DELETE_SURVEY:
			return {
				...state,
				surveysById: _.omit(state.surveysById, action.payload)
			};
		case SELECTED_SURVEY_ID:
			return { ...state, selectedSurvey: action.payload };

		default:
			return state;
	}
}
