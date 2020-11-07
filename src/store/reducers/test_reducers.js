import { PASS_QUESTION, CLEAN_TESTS } from "../types";

const initialState = {
  test: [],
};

export const test_reducers = (state = initialState, action) => {
  switch (action.type) {
    case PASS_QUESTION: {
      return {
        ...state,
        test: [...state.test, action.payload],
      };
    }
    case CLEAN_TESTS: {
      return {
        ...state,
        test: [],
      };
    }
    default: {
      return state;
    }
  }
};
