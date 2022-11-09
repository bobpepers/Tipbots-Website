import {
  FETCH_COIN_INFO_BEGIN,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_COIN_INFO_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case FETCH_COIN_INFO_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case FETCH_COIN_INFO_FAIL:
    return {
      ...state,
      data: state.data,
      error: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};
