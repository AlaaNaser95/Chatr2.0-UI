import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("Token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    // fetchChannels();
  } else {
    localStorage.removeItem("Token");
    delete axios.defaults.headers.common.Authorization;
  }
};
export const checkForExpiredToken = () => {
  return dispatch => {
    const token = localStorage.Token;
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = (userData, history) => {
  return dispatch => {
    instance
      .post("login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/private");
      })
      .catch(err => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const signup = (userData, history) => {
  return dispatch => {
    instance
      .post("signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/private");
      })
      .catch(err => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
