import { CLIENT_ERRORS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case CLIENT_ERRORS:
		return { ...action.payload };
		default:
			return state;
	}
};
