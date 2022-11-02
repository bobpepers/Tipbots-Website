import {
  FETCH_TELEGRAM_USER_BALANCE_BEGIN,
  FETCH_TELEGRAM_USER_BALANCE_SUCCESS,
  FETCH_TELEGRAM_USER_BALANCE_FAIL,
  FETCH_TELEGRAM_USER_BALANCE_IDLE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TELEGRAM_USER_BALANCE_IDLE:
    return {
      ...state,
      data: [],
      error: null,
    };
  case FETCH_TELEGRAM_USER_BALANCE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TELEGRAM_USER_BALANCE_SUCCESS:
    return {
      ...state,
      data: {
        ...state.data,
        [action.tipbotInfo.name]: {
          name: action.tipbotInfo.name,
          logo: action.tipbotInfo.logo,
          wallets: action.payload,
        },
      },
      isFetching: false,
    };

  case FETCH_TELEGRAM_USER_BALANCE_FAIL:
    return {
      ...state,
      data: state.data,
      error: action.payload,
      isFetching: false,
    };
  default:
    return state;
  }
};
