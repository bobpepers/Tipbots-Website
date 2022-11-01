import {
  FETCH_DISCORD_USER_BEGIN,
  FETCH_DISCORD_USER_SUCCESS,
  FETCH_DISCORD_USER_FAIL,
  FETCH_DISCORD_USER_IDLE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DISCORD_USER_IDLE:
    return {
      ...state,
      data: null,
      error: null,
    };
  case FETCH_DISCORD_USER_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_DISCORD_USER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_DISCORD_USER_FAIL:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  default:
    return state;
  }
};
