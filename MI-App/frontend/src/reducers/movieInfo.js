import * as types from "../actions/actionTypes";
import update from "react-addons-update";

const initialState = {
  movieInfo: [],
  recentMovieInfo: [],
  recentInfoLoaded: false,
  InfoLoaded: false,
  collaboToDetail: []
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
        recentMovieInfo: update(state.recentMovieInfo, {
          $push: action.payload
        }),
        recentInfoLoaded: true
      };
    case types.CLEAR_MOVIE_INFO:
      return {
        ...state,
        movieInfo: [],
        InfoLoaded: false
      };
    case types.COLLABO_TO_DETAIL:
      return {
        ...state,
        collaboToDetail: action.payload
      };
    default:
      return state;
  }
}
