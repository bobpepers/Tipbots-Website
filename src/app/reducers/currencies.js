import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PRICECURRENCIES_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case FETCH_PRICECURRENCIES_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case FETCH_PRICECURRENCIES_FAIL:
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
