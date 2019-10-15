import auth from "./auth";
import messages from "./messages";
import errors from "./errors";
import { combineReducers } from "redux";
import { LOGOUT_SUCCESSFUL } from "../actions/actionTypes";
import getScore from "./getScore";

const appReducer = combineReducers({
  auth,
  messages,
  errors,
  getScore
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESSFUL) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
