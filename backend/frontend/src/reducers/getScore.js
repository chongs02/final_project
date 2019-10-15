import * as types from "../actions/actionTypes";

const initialState = {
  movieData: [],
  isLoaded: false
};

export default function getScore(state = initialState, action) {
  switch (action.type) {
    case types.GET_SCORE:
      return {
        ...state,
        movieData: action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}
