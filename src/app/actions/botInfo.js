import axios from '../axios';
import {
  FETCH_BOT_INFO_BEGIN,
  FETCH_BOT_INFO_SUCCESS,
  FETCH_BOT_INFO_FAIL,
  FETCH_BOT_INFO_IDLE,
} from './types/index';

export function fetchBotInfoAction(
  tipbotInfo,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_BOT_INFO_BEGIN,
    });
    axios.get(`${tipbotInfo.userApiUrl}/bot/info`, { withCredentials: true })
      .then((response) => {
        if (response.data.result === 'NO_USER_FOUND') {
          dispatch({
            type: FETCH_BOT_INFO_IDLE,
          });
        } else if (response.data.result) {
          dispatch({
            type: FETCH_BOT_INFO_SUCCESS,
            payload: response.data.result,
            tipbotInfo,
          });
        }
      }).catch((error) => {
        dispatch({
          type: FETCH_BOT_INFO_FAIL,
          payload: error.code,
        });
      });
  }
}
