import axios from "axios";
import { FETCH_USER, SERVER_ERROR } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  // will return updated user so passing back through fetch user will update user w/ new credits...
  dispatch({ type: FETCH_USER, payload: res.data });
};
