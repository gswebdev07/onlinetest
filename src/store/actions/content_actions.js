import { SET_CONTENT, } from "../types";

export const set_content = (variable) => (dispatch) => {
  dispatch({ type: SET_CONTENT, content: variable });
};

