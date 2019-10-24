import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const getDailyMovie = date => async dispatch => {
  let url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=${date}`;
  await axios
    .get(url)
    .then(response => {
      console.log(response);
      dispatch({
        type: types.GET_DAILY_MOVIE,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
    });
};
