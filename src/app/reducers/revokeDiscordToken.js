import {
  REVOKE_DISCORD_TOKEN_BEGIN,
  REVOKE_DISCORD_TOKEN_SUCCESS,
  REVOKE_DISCORD_TOKEN_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case REVOKE_DISCORD_TOKEN_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case REVOKE_DISCORD_TOKEN_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case REVOKE_DISCORD_TOKEN_FAIL:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  default:
    return state;
  }
};
