import axios from "axios";
import * as appConstants from "../appConstants";

export const getAllAwards = () => {
  let url = appConstants.baseUrl + "awards/all";

  axios(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
  }).then((response) => console.log(response));
};
