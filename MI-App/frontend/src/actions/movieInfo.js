import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const movieInfo = () => async dispatch => {
  await axios
    .get("/movie-api/movieInfo/")
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
