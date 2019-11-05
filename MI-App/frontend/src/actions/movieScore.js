import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const getScore = movieCd => async dispatch => {
  let url = "/movie-api/";
  url = url + "?search=" + movieCd;
  await axios
    .get(url)
    .then(response => {
      dispatch({
        type: types.GET_SCORE,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
    });
};
