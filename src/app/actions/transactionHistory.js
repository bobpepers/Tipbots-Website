import axios from '../axios';
import {
  FETCH_TRANSACTION_HISTORY_BEGIN,
  FETCH_TRANSACTION_HISTORY_SUCCESS,
  FETCH_TRANSACTION_HISTORY_FAIL,
} from './types/index';

export function fetchTransactionHistoryAction(
  userApiUrl,
  chatClient,
  coin,
  type,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_TRANSACTION_HISTORY_BEGIN,
    });
    axios.post(`${userApiUrl}/dashboard/history/transaction`, {
      chatClient,
      coin,
      type,
      offset,
      limit,
    }, {
      withCredentials: true,
    }).then((response) => {
      dispatch({
        type: FETCH_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_TRANSACTION_HISTORY_FAIL,
        payload: error.code,
      });
    });
  }
}
