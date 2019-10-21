import * as types from "../actions/actionTypes";

const initialState = {
  movieData: [],
  scoreLoaded: false
};

export default function getScore(state = initialState, action) {
  switch (action.type) {
    case types.GET_SCORE:
      return {
        ...state,
        movieData: action.payload,
        scoreLoaded: true
      };
    default:
      return state;
  }
}
