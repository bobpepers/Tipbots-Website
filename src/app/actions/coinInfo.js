import axios from '../axios';
import {
  FETCH_COIN_INFO_BEGIN,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_FAIL,
} from './types/index';

export function fetchCoinInfoAction(
  userApiUrl,
  coinTicker,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_COIN_INFO_BEGIN,
    });
    axios.get(`${userApiUrl}/coin/${coinTicker}`, { withCredentials: true })
      .then((response) => {
        dispatch({
          type: FETCH_COIN_INFO_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_COIN_INFO_FAIL,
          payload: error.code,
        });
      });
  }
}
