import axios from 'axios';
// import { FETCH_USER, SERVER_ERROR } from "./types";
import { FETCH_USER, CLIENT_ERRORS } from './types';

export const localSignup = (
  { email, password, firstName, lastName },
  history,
  from
) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null });
  try {
    const res = await axios.post('/auth/localSignup', {
      email,
      password,
      firstName,
      lastName
    });

    const { user } = res.data;

    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
      history.push(from);
    }
  } catch ({ response }) {
    dispatch({
      type: CLIENT_ERRORS,
      payload: response.data
    });
  }
};

export const localLogin = (
  { email, password, firstName, lastName },
  history,
  from
) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null }); // reset errors.
  try {
    const res = await axios.post('/auth/localLogin', {
      email,
      password
    });

    const { user } = res.data;

    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
      history.push(from);
    }
  } catch ({ response }) {
    console.log('signupError', response.data);
    dispatch({
      type: CLIENT_ERRORS,
      payload: { localLogin: response.data.message }
    });
  }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // will return updated user so passing back through fetch user will update user w/ new credits...
  dispatch({ type: FETCH_USER, payload: res.data });
};
