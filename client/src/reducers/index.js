// default import of /reducers directory will grab the index file...
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import errorsReducer from './errorsReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer,
	serverErrors: errorsReducer
});
