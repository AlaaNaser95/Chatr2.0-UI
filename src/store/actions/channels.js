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

export const createChannel = (form, history) => {
  return dispatch => {
    instance
      .post("channels/create/", form)
      .then(res => res.data)
      .then(channel => {
        dispatch({ type: actionTypes.CREATE_CHANNEL, payload: channel });
        history.push(`/channels/${form.name}`);
      })
      .catch(err => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const fetchMessages = channelId => {
  return dispatch => {
    instance
      .get(`channels/${channelId}`)
      .then(res => res.data)
      .then(messages =>
        dispatch({
          type: actionTypes.FETCH_MESSAGES,
          payload: messages
        })
      )
      .catch(err => console.error(err));
  };
};

export const sendMessage = (channelId, message) => {
  return dispatch => {
    instance
      .post(`channels/${channelId}/send/`, message)
      .then(res => res.data)
      .then(() =>
        dispatch({ type: actionTypes.SEND_MESSAGE, payload: message })
      )
      .catch(err => console.log(err.response));
  };
};
