import * as types from "../actions/actionTypes";

const initialState = {
  dailyMovie: []
};

export default function getDailyMovie(state = initialState, action) {
  switch (action.type) {
    case types.GET_DAILY_MOVIE:
      return {
        ...state,
        dailyMovie: action.payload
      };
    default:
      return state;
  }
}
