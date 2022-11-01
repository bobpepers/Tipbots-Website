import axios from '../axios';
import {
  FETCH_DISCORD_USER_BALANCE_BEGIN,
  FETCH_DISCORD_USER_BALANCE_SUCCESS,
  FETCH_DISCORD_USER_BALANCE_FAIL,
  FETCH_DISCORD_USER_BALANCE_IDLE,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchDiscordUserBalanceAction(
  tipbotInfo,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_DISCORD_USER_BALANCE_BEGIN,
    });
    axios.get(`${tipbotInfo.userApiUrl}/discord/balance`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.result === 'NO_USER_FOUND') {
          dispatch({
            type: FETCH_DISCORD_USER_BALANCE_IDLE,
          });
        } else {
          dispatch({
            type: FETCH_DISCORD_USER_BALANCE_SUCCESS,
            payload: response.data.result,
            tipbotInfo,
          });
        }
      }).catch((error) => {
        console.log(error);
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_DISCORD_USER_BALANCE_FAIL,
          payload: error,
        });
      });
  }
}
