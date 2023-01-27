import * as appConstants from "../appConstants";
import axios from "axios";

export const awardPoints = (dispatch, award) => {
  //TODO: update store once points are awarded

  let url = appConstants.baseUrl + "award";

  return axios.post(url, award, {
    method: "POST",
    // mode: "no-cors",
    headers: {
      // "Access-Control-Allow-Origin": "*",
    },
    // withCredentials: false,
  });
};

export const createHouse = (house) => {
  let url = appConstants.baseUrl + "house/create/" + house.name;

  //TODO: update store once the house is created

  axios(url, house, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
  })
    .then((response) => {})
    .catch(function (error) {});
};

export const getActiveSchoolyear = (dispatch) => {
  let url = appConstants.baseUrl + "schoolyear";

  axios(url, {
    method: "GET",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  })
    .then((response) => {
      return dispatch({
        type: appConstants.GET_ACTIVE_SCHOOLYEAR,
        payload: response.data,
      });
    })
    .catch(function (error) {});
};
export const getActiveSchoolyearPromise = (dispatch) => {
  let url = appConstants.baseUrl + "schoolyear";

  return axios(url, {
    method: "GET",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const getAllUsers = (dispatch) => {
  let url = appConstants.baseUrl + "users";

  return axios(url, {
    method: "GET",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const updateUser = (dispatch, user) => {
  let url = appConstants.baseUrl + `users/` + user.SK;

  return axios.put(url, user, {
    method: "PUT",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const setSchoolYearActive = (dispatch, sk) => {
  let url = appConstants.baseUrl + `schoolyear/active/${sk}`;

  return axios.put(
    url,
    {},
    {
      method: "PUT",
      // mode: "no-cors",
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // },
      // withCredentials: false,
    }
  );
};

export const updateSchoolYearName = (dispatch, schoolYear) => {
  let url = appConstants.baseUrl + `schoolyear/` + schoolYear.SK;

  return axios.put(url, schoolYear, {
    method: "PUT",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const deleteUser = (dispatch, SK) => {
  let url = appConstants.baseUrl + `users/${SK}`;

  return axios.delete(url, {
    method: "DELETE",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const createUser = (dispatch, user) => {
  let url = appConstants.baseUrl + `users`;

  return axios.post(url, user, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
  });
};

export const getAllAwards = (dispatch, page, size) => {
  let url = appConstants.baseUrl + `award?page=${page}&size=${size}`;
  // let url = appConstants.baseUrl + `award`;

  return axios(url, {
    method: "GET",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const updateAward = (dispatch, award) => {
  let url = appConstants.baseUrl + "award/" + award.SK;

  return axios
    .put(url, award, {
      method: "PUT",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    })
    .then((response) => {
      dispatch({
        type: appConstants.UPDATE_AWARDS,
        payload: award,
      });
    });
};

export const deleteAward = (dispatch, id) => {
  let url = appConstants.baseUrl + `award/${id}`;

  return axios
    .delete(url, {
      method: "DELETE",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    })
    .then((response) => {
      dispatch({
        type: appConstants.UPDATE_AWARDS_DELETED,
        payload: id,
      });
    });
};

export const getPoints = (dispatch) => {
  let url = appConstants.baseUrl + "points/";
  axios
    .get(url, {
      method: "GET",
    })
    .then((response) => {
      return dispatch({
        type: appConstants.GET_POINTS,
        payload: response.data,
      });
    })
    .catch(function (error) {});
};

export const getPointsPromise = (dispatch) => {
  let url = appConstants.baseUrl + "points/";
  return axios.get(url, {
    method: "GET",
  });
};

export const getPointsIntegersPromise = (id, dispatch) => {
  let url = appConstants.baseUrl + "points/" + id;

  return axios.get(url, {
    method: "GET",
  });
};

export const validateJWT = (dispatch, user) => {
  let url = appConstants.baseUrl + "auth/validate";
  return axios.post(url, user, {
    method: "POST",
  });
};

export const setToken = (dispatch, token) => {
  dispatch({
    type: appConstants.SET_TOKEN,
    payload: token,
  });
};

export const getEvents = (dispatch) => {
  let calendarId = appConstants.calendarID;

  window.gapi.client
    .init({
      apiKey: appConstants.gapiKey,
    })
    .then(function () {
      return window.gapi.client.request({
        path:
          "https://www.googleapis.com/calendar/v3/calendars/" +
          calendarId +
          "/events",
        params: {
          timeMin: new Date().toISOString(),
          orderBy: "startTime",
          sortOrder: "descending",
          singleEvents: true,
        },
      });
    })
    .then((response) => {
      let events = response.result.items;
      dispatch({
        type: appConstants.GET_EVENTS,
        payload: events,
        success: events ? true : false,
      });
    })
    .catch((error) => {});
};

export const getIdByName = (name, schoolData) => {
  schoolData.forEach((category) => {
    if (category.name === name) return category.id;
  });
  return -1;
};

export const getRecentAwards = (dispatch) => {
  let url = appConstants.baseUrl + "award/recent";

  axios(url, {
    method: "GET",
  })
    .then((response) => {
      return dispatch({
        type: appConstants.GET_RECENT_AWARDS,
        payload: response.data,
      });
    })
    .catch(function (error) {});
};

export const getRecentAwardsPromise = (dispatch) => {
  let url = appConstants.baseUrl + "award/recent";

  return axios(url, {
    method: "GET",
  });
};

export const getSchoolYearNames = (dispatch) => {
  let url = appConstants.baseUrl + "schoolyear/all";

  return axios(url, {
    method: "GET",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};

export const reset = (dispatch, schoolYear) => {
  let url = appConstants.baseUrl + `schoolyear`;

  return axios.post(url, schoolYear, {
    method: "POST",
    // mode: "no-cors",
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: false,
  });
};
