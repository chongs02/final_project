import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

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
  // console.log(getState());
  dispatch({
    type: types.USER_LOADING
  });
  // console.log("tokenconfig", tokenConfig(getState));
  await axios
    .get("/api/user/", tokenConfig(getState))
    .then(res => {
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

// export const loadUser = () => {
//   return (dispatch, getState) => {
//     dispatch({ type: "USER_LOADING" });

//     const token = getState().auth.token;

//     let headers = {
//       "Content-Type": "application/json"
//     };

//     if (token) {
//       headers["Authorization"] = `Token ${token}`;
//     }
//     return fetch("/api/auth/user/", { headers })
//       .then(response => {
//         if (response.status < 500) {
//           return response.json().then(data => {
//             return { status: response.status, data };
//           });
//         } else {
//           console.log("SEVER ERROR");
//           throw response;
//         }
//       })
//       .then(response => {
//         if (response.status === 200) {
//           dispatch({ type: "USER_LOADING", user: response.data });
//           return response.data;
//         } else if (response.status >= 400 && response.status < 500) {
//           dispatch({ type: "AUTHENTICATION_ERROR", data: response.data });
//           throw response.data;
//         }
//       });
//   };
// };

// export const login = (username, password) => {
//   return (dispatch, getState) => {
//     let headers = { "Content-Type": "application.json" };
//     let body = JSON.stringify({ username, password });

//     return fetch("/api/auth/login/", {
//       headers,
//       body,
//       method: "POST"
//     })
//       .then(response => {
//         console.log(response);
//         if (response.status < 500) {
//           return response.json().then(data => {
//             return { status: response.status, data };
//           });
//         } else {
//           console.log("SERVER ERROR");
//           throw response;
//         }
//       })
//       .then(response => {
//         if (response.status === 200) {
//           dispatch({ type: "LOGIN_SUCCESSFUL", data: response.data });
//           return response.data;
//         } else if (response.status === 403 || response.status === 401) {
//           dispatch({ type: "AUTHUENTICATON_ERROR", data: response.data });
//           throw response.data;
//         } else {
//           dispatch({ type: "LOGIN_FAILED", data: response.data });
//           throw response.data;
//         }
//       });
//   };
// };

// export const register = (username, password) => {
//   return (dispatch, getState) => {
//     let headers = { "Content-Type": "application/json" };
//     let body = JSON.stringify({ username, password });

//     return fetch("/api/auth/register/", { headers, body, method: "POST" })
//       .then(res => {
//         console.log(res);
//         if (res.status < 500) {
//           return res.json().then(data => {
//             return { status: res.status, data };
//           });
//         } else {
//           console.log("Server Error!");
//           throw res;
//         }
//       })
//       .then(res => {
//         if (res.status === 200) {
//           dispatch({ type: "REGISTRATION_SUCCESSFUL", data: res.data });
//           return res.data;
//         } else if (res.status === 403 || res.status === 401) {
//           dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
//           throw res.data;
//         } else {
//           dispatch({ type: "REGISTRATION_FAILED", data: res.data });
//           throw res.data;
//         }
//       });
//   };
// };
