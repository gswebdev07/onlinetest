import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  USER_LOADING,
  SET_METHOD,
  SCK,
  USER_UNLOADING,
   SET_ERROR 
} from "../types";

const initialState = {
  user: "Guest",
  user_credentials: {},
  authenticated: false,
  method: "TEST",
  sc: "",
  loading: false,
  error: null,
};

// Consts
const admin_email = "testpencil.help@gmail.com";
const admin = "Admin";
const user = "User";
const guest = "Guest";

export const user_reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED: {
      return {
        ...state,
        user: action.payload.data.email !== admin_email ? user : admin,
        user_credentials: action.payload.data,
        authenticated: true,
        loading: false,
      };
    }
    case SET_UNAUTHENTICATED: {
      return {
        ...state,
        user: guest,
        user_credentials: {},
        authenticated: false,
        loading: false,
      };
    }
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_UNLOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_METHOD: {
      return {
        ...state,
        method: action.payload,
      };
    }
    case SCK: {
      return {
        ...state,
        sc: `${action.payload}`,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
