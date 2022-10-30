import {
  FETCH_DISCORD_USER_BALANCE_BEGIN,
  FETCH_DISCORD_USER_BALANCE_SUCCESS,
  FETCH_DISCORD_USER_BALANCE_FAIL,
  FETCH_DISCORD_USER_BALANCE_IDLE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DISCORD_USER_BALANCE_IDLE:
    return {
      ...state,
      data: [],
      error: null,
    };
  case FETCH_DISCORD_USER_BALANCE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_DISCORD_USER_BALANCE_SUCCESS:
    if (!state.data.find((x) => x.name === action.tipbotInfo.name)) {
      return {
        ...state,
        data: [
          ...state.data,
          {
            name: action.tipbotInfo.name,
            logo: action.tipbotInfo.logo,
            wallets: action.payload,
          },
        ],
        isFetching: false,
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        [action.tipbotInfo.name]: {
          ...action.payload,
        },
      },
      isFetching: false,
    };

  case FETCH_DISCORD_USER_BALANCE_FAIL:
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
