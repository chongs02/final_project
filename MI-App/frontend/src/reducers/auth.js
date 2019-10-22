import * as types from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  profileLoading: false,
  profile: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOADING:
      return { ...state, isLoading: true };

    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case types.USER_PROFILE_LOADING:
      return { ...state, profileLoading: true };

    case types.USER_PROFILE_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        profileLoading: false,
        profile: action.payload
      };

    case types.LOGIN_SUCCESSFUL:
    case types.REGISTRATION_SUCCESSFUL:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case "AUTHENTICATION_ERROR":
    case "LOGIN_FAILED":
    case "REGISTRATION_FAILED":
    case "LOGOUT_SUCCESSFUL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}
