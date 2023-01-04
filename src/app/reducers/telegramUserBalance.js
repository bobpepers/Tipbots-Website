import {
  FETCH_TELEGRAM_USER_BALANCE_BEGIN,
  FETCH_TELEGRAM_USER_BALANCE_SUCCESS,
  FETCH_TELEGRAM_USER_BALANCE_FAIL,
  FETCH_TELEGRAM_USER_BALANCE_IDLE,
  UPDATE_USER_SETTINGS,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TELEGRAM_USER_BALANCE_IDLE:
    return {
      ...state,
      data: {},
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
        [action.payload.name]: {
          name: action.payload.name,
          version: action.payload.version,
          logo: action.tipbotInfo.logo,
          wallets: action.payload.wallets,
          userSettings: {
            excludePublicStats: action.payload.excludePublicStats,
            stealth: action.payload.stealth,
            ignoreMe: action.payload.ignoreMe,
          },
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

  case UPDATE_USER_SETTINGS:
    return {
      ...state,
      data: {
        ...state.data,
        ...(state.data[action.tipbotInfo.name] && {
          [action.tipbotInfo.name]: {
            name: state.data[action.tipbotInfo.name].name,
            version: state.data[action.tipbotInfo.name].version,
            logo: action.tipbotInfo.logo,
            wallets: state.data[action.tipbotInfo.name].wallets,
            // myServers: state.data[action.tipbotInfo.name].myServers,
            userSettings: {
              excludePublicStats: action.payload.excludePublicStats,
              stealth: action.payload.stealth,
              ignoreMe: action.payload.ignoreMe,
            },
          },
        }),
      },
      isFetching: false,
    };
  default:
    return state;
  }
};
