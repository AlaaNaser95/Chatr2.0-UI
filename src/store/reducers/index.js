import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import channelReducer from "./channels";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels: channelReducer
});
