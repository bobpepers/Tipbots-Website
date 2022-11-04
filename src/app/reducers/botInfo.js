import {
  FETCH_BOT_INFO_BEGIN,
  FETCH_BOT_INFO_SUCCESS,
  FETCH_BOT_INFO_FAIL,
  FETCH_BOT_INFO_IDLE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_BOT_INFO_IDLE:
    return {
      ...state,
      data: [],
      error: null,
    };
  case FETCH_BOT_INFO_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_BOT_INFO_SUCCESS:
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.name]: {
          name: action.payload.name,
          version: action.payload.version,
          isMultiToken: action.payload.isMultiToken,
          logo: action.tipbotInfo.logo,
          coins: action.payload.coins,
          stats: action.payload.stats,
          telegramLink: action.tipbotInfo.telegramLink,
          discordLink: action.tipbotInfo.discordLink,
        },
      },
      isFetching: false,
    };

  case FETCH_BOT_INFO_FAIL:
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
