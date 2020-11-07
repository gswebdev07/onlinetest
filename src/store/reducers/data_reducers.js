import {
  DATA_LOADING,
  SET_CLASSES,
  SET_SUBJECTS,
  SET_DIRECTORY,
  SET_CHAPTERS,
  SET_TOPICS,
  SET_USERS,
  SET_FAQS,
  SET_QUESTIONS,
  SET_RESULTS,
  SET_GENERAL,
  DATA_UNLOADING,
} from "../types";

const initialState = {
  classes: [],
  subjects: [],
  chapters: [],
  topics: [],
  faqs: [],
  questions: [],
  users: [],
  results: [],
  general: {},
  current_directory: {},
  loading: false,
};

export const data_reducers = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DATA_UNLOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_CLASSES: {
      return {
        ...state,
        classes: action.payload,
        loading: false,
      };
    }
    case SET_SUBJECTS: {
      return {
        ...state,
        subjects: action.payload,
        loading: false,
      };
    }
    case SET_CHAPTERS: {
      return {
        ...state,
        chapters: action.payload,
        loading: false,
      };
    }
    case SET_TOPICS: {
      return {
        ...state,
        topics: action.payload,
        loading: false,
      };
    }
    case SET_FAQS: {
      return {
        ...state,
        faqs: action.payload,
        loading: false,
      };
    }
    case SET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
    case SET_RESULTS: {
      return {
        ...state,
        results: action.payload,
        loading: false,
      };
    }
    case SET_GENERAL: {
      return {
        ...state,
        general: action.payload[0],
        loading: false,
      };
    }
    case SET_DIRECTORY: {
      return {
        ...state,
        current_directory: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
