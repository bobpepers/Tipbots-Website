import axios from '../axios';
import {
  FETCH_HISTORY_BEGIN,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_FAIL,
} from './types/index';

export function fetchHistoryAction(
  userApiUrl,
  chatClient,
  coin,
  feature,
  type,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_HISTORY_BEGIN,
    });
    axios.post(`${userApiUrl}/dashboard/history`, {
      chatClient,
      coin,
      feature,
      type,
      offset,
      limit,
    }, {
      withCredentials: true,
    })
      .then((response) => {
        dispatch({
          type: FETCH_HISTORY_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_HISTORY_FAIL,
          payload: error.code,
        });
      });
  }
}
