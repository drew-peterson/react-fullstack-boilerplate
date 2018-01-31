import { SERVER_ERROR } from '../actions/types';

export default (state = null, action) => {
	switch (action.type) {
		case SERVER_ERROR:
			return { ...action.payload };
		default:
			return state;
	}
};
