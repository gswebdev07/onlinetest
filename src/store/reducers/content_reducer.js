import { SET_CONTENT} from "../types";

const initialState = {
  content: "",

};

export const content_reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT: {
      return {
        ...state,
        content: action.content,
      };
    }

    default:
      return state;
  }
};

export default content_reducer;
