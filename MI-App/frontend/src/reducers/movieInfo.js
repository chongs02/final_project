import * as types from "../actions/actionTypes";

const initialState = {
  movieInfo: [],
  recentMovieInfo: [],
  recentInfoLoaded: false,
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
    case types.GET_RECENT_MOVIE_INFO:
      return {
        ...state,
        recentMovieInfo: [...state.recentMovieInfo, action.payload],
        recentInfoLoaded: true
      };

    case types.CLEAR_MOVIE_INFO:
      return {
        ...state,
        movieInfo: [],
        InfoLoaded: false
      };
    default:
      return state;
  }
}
