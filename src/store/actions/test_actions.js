import axios from "axios";
import { DATA_LOADING, PASS_QUESTION, CLEAN_TESTS } from "../types";
import { get_results } from "./data_actions";

export const pass_question = (question) => async (dispatch) => {
  await dispatch({ type: PASS_QUESTION, payload: question });
};

export const clean_tests = () => async (dispatch) => {
  dispatch({ type: CLEAN_TESTS });
};

export const send_results = (result) => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  await axios
    .post("/api/results", result)
    .then(() => dispatch(get_results()))
    .catch((err) => console.log(err));
};
