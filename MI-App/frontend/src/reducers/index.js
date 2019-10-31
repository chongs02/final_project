import { combineReducers } from "redux";
import { LOGOUT_SUCCESSFUL } from "../actions/actionTypes";
import auth from "./auth";
import messages from "./messages";
import errors from "./errors";
import getScore from "./getScore";
import getMovieInfo from "./movieInfo";

const appReducer = combineReducers({
  auth,
  messages,
  errors,
  getScore,
  getMovieInfo
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESSFUL) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
