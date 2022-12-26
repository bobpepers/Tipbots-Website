import {
  FETCH_ACTIVITY_HISTORY_BEGIN,
  FETCH_ACTIVITY_HISTORY_SUCCESS,
  FETCH_ACTIVITY_HISTORY_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ACTIVITY_HISTORY_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case FETCH_ACTIVITY_HISTORY_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isLoading: false,
    };

  case FETCH_ACTIVITY_HISTORY_FAIL:
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
