import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const movieInfo = searchInfo => async dispatch => {
  let url = "/movieInfo/";
  url = url + "?search=" + searchInfo;
  await axios
    .get(url)
    .then(response => {
      console.log(response);
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
