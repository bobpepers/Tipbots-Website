import {
  FETCH_CHANGELOG_BEGIN,
  FETCH_CHANGELOG_SUCCESS,
  FETCH_CHANGELOG_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_CHANGELOG_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case FETCH_CHANGELOG_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case FETCH_CHANGELOG_FAIL:
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
