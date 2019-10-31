import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";
// import { movieInfo, clearMovieInfo } from "./movieInfo";

// django csrftoken
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const tokenConfig = getState => {
  //state에서 token을 가져옴
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

//Register User
export const register = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { username, password };
  await axios
    .post("/api/register/", body, config)
    .then(res => {
      dispatch({
        type: types.REGISTRATION_SUCCESSFUL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.REGISTRATION_FAILED
      });
    });
};

//Login User
export const login = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { username, password };

  await axios
    .post("/api/login/", body, config)
    .then(res => {
      dispatch({
        type: types.LOGIN_SUCCESSFUL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.LOGIN_FAILED
      });
    });
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: types.USER_LOADING
  });
  await axios
    .get("/api/user/", tokenConfig(getState))
    .then(res => {
      // console.log(res);
      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTHENTICATION_ERROR
      });
    });
};

export const logout = () => async (dispatch, getState) => {
  await axios
    .post("/api/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: types.LOGOUT_SUCCESSFUL
      });
    })
    .then(err => {
      console.log(err);
    });
};

// load user custom
export const loadUserProfile = () => async (dispatch, getState) => {
  dispatch({
    type: types.USER_PROFILE_LOADING
  });
  await axios
    .get("/api/profile/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: types.USER_PROFILE_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTHENTICATION_ERROR
      });
    });
};
