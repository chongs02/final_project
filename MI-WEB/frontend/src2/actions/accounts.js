import axios from "axios";

import { GET_ACCOUNTS } from "./actionTypes";

export const getAccounts = () => dispatch => {
  axios
    .get("api/account/")
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_ACCOUNTS,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};
