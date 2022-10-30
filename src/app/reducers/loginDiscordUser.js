import {
  LOGIN_DISCORD_USER_BEGIN,
  LOGIN_DISCORD_USER_SUCCESS,
  LOGIN_DISCORD_USER_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_DISCORD_USER_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case LOGIN_DISCORD_USER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case LOGIN_DISCORD_USER_FAIL:
    console.log('Error: ', action.error);
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
