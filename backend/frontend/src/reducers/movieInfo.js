import * as types from "../actions/actionTypes";

const initialState = {
  movieInfo: [],
  InfoLoaded: false
};

export default function getMovieInfo(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOVIE_INFO:
      return {
        ...state,
        movieInfo: action.payload,
        InfoLoaded: true
      };
    default:
      return state;
  }
}
