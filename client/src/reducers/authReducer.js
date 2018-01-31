import { FETCH_USER } from "../actions/types";

// return null because if slow internet then the api request to get user might take some time
// we dont know the return so we give null
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if not logged in return false
    default:
      return state;
  }
}
