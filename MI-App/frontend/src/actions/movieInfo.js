import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const movieInfo = searchInfo => async dispatch => {
  let url = "/movieInfo/";
  url = url + "?search=" + searchInfo;
  await axios
    .get(url)
    .then(response => {
      dispatch({
        type: types.GET_MOVIE_INFO,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
    });
};

export const recentMovieInfo = searchInfo => async dispatch => {
  let url = "/movieInfo/";
  url = url + "?search=" + searchInfo;
  await axios
    .get(url)
    .then(response => {
      dispatch({
        type: types.GET_RECENT_MOVIE_INFO,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
    });
};

export const clearMovieInfo = () => dispatch => {
  return {
    type: types.CLEAR_MOVIE_INFO
  };
};

export const collaboToDetail = data => {
  return {
    type: types.COLLABO_TO_DETAIL,
    payload: data
  };
};
