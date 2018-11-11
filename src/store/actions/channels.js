import axios from "axios";
import { setErrors } from "./errors";
import * as actionTypes from "./actionTypes";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return dispatch => {
    instance
      .get("channels/")
      .then(res => res.data)
      .then(channels =>
        dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels })
      )
      .catch(error => console.error(error));
  };
};

export const createChannel = form => {
  return dispatch => {
    instance
      .post("channels/create/", form)
      .then(res => res.data)
      .then(channel =>
        dispatch({ type: actionTypes.CREATE_CHANNEL, payload: channel })
      )
      .catch(error => err => {
        dispatch(setErrors(err.response.data));
      });
  };
};
