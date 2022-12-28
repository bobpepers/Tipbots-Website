import {
  FETCH_DISCORD_USER_BALANCE_BEGIN,
  FETCH_DISCORD_USER_BALANCE_SUCCESS,
  FETCH_DISCORD_USER_BALANCE_FAIL,
  FETCH_DISCORD_USER_BALANCE_IDLE,
  UPDATE_DISCORD_USER_BALANCE_SERVER,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DISCORD_USER_BALANCE_IDLE:
    return {
      ...state,
      data: {},
      error: null,
    };
  case FETCH_DISCORD_USER_BALANCE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_DISCORD_USER_BALANCE_SUCCESS:
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.name]: {
          name: action.payload.name,
          version: action.payload.version,
          logo: action.tipbotInfo.logo,
          wallets: action.payload.wallets,
          myServers: action.payload.myServers,
        },
      },
      isFetching: false,
    };

  case FETCH_DISCORD_USER_BALANCE_FAIL:
    return {
      ...state,
      data: state.data,
      error: action.payload,
      isFetching: false,
    };

  case UPDATE_DISCORD_USER_BALANCE_SERVER:
    return {
      ...state,
      data: {
        ...state.data,
        [action.tipbotInfo.name]: {
          name: state.data[action.tipbotInfo.name].name,
          version: state.data[action.tipbotInfo.name].version,
          logo: action.tipbotInfo.logo,
          wallets: state.data[action.tipbotInfo.name].wallets,
          myServers: state.data[action.tipbotInfo.name].myServers.map((server) => {
            if (server.groupId === action.payload.groupId) {
              return {
                ...server,
                discordFaucetChannelId: action.payload.discordFaucetChannelId,
                discordTipMessageChannelId: action.payload.discordTipMessageChannelId,
                groupName: action.payload.groupName,
              };
            }

            return server;
          }),
        },
      },
      isFetching: false,
    };
  default:
    return state;
  }
};
