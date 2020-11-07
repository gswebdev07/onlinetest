import axios from "axios";
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  USER_LOADING,
  SET_METHOD,
  DATA_LOADING,
  DATA_UNLOADING,
  SCK,
  USER_UNLOADING,
  SET_ERROR,
} from "../types";

export const sign_in = (user_credentials) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  await axios
    .post("/api/user/sign_in", user_credentials)
    .then((res) => setAuthorizationHeader(res.data.token))
    .then(() => dispatch(get_user()))
    .catch((err) => {
      dispatch({ type: USER_UNLOADING });
      dispatch(set_error(err));
    });
};

export const sign_up = (user_credentials) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  dispatch({ type: USER_LOADING });
  await axios
    .post("/api/user/sign_up", user_credentials)
    .then((res) => {
      console.log(res);
      dispatch({ type: USER_UNLOADING });
      if (res.data.secret_code) {
        return dispatch({ type: SCK, payload: res.data.secret_code });
      }
      dispatch({ type: USER_LOADING });
      setAuthorizationHeader(res.data.token);
      dispatch(get_user());
    })
    .catch((err) => console.log(err));
};

export const get_user = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  await axios
    .get("/api/user/get_user")
    .then((res) => {
      dispatch({ type: SET_AUTHENTICATED, payload: res.data });
      dispatch({ type: DATA_UNLOADING });
    })
    .catch((err) => dispatch({ type: USER_UNLOADING }));
};

export const log_out = () => (dispatch) => {
  localStorage.removeItem("Token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = "/";
};

export const setAuthorizationHeader = (token) => {
  const Token = `Bearer ${token}`;
  localStorage.setItem("Token", Token);
  axios.defaults.headers.common["Authorization"] = Token;
};

export const forgot_password = (email) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  await axios
    .post("/api/user/forgot_password", email)
    .then(() => dispatch({ type: USER_UNLOADING }))
    .catch((err) => console.log(err));
};

export const update_credentials = (user_credentials) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/user/update", user_credentials)
    .then(() => dispatch(get_user()))
    .catch((err) => console.log(err));
};

export const delete_account = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/user/delete_account")
    .then(() => dispatch(log_out()))
    .catch((err) => console.log(err));
};

// Bookmarks actions
export const add_bookmark = (question) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/user/bookmarks", question)
    .then(() => dispatch(get_user()))
    .catch((err) => console.log(err));
};

export const set_method = (method) => (dispatch) => {
  dispatch({ type: SET_METHOD, payload: method });
};
export const set_error = (err) => (dispatch) => {
  dispatch({ type: SET_ERROR, error: err });
};
