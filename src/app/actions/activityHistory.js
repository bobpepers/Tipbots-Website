import axios from '../axios';
import {
  FETCH_ACTIVITY_HISTORY_BEGIN,
  FETCH_ACTIVITY_HISTORY_SUCCESS,
  FETCH_ACTIVITY_HISTORY_FAIL,
} from './types/index';

export function fetchActivityHistoryAction(
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
      type: FETCH_ACTIVITY_HISTORY_BEGIN,
    });
    axios.post(`${userApiUrl}/dashboard/history/activity`, {
      chatClient,
      coin,
      feature,
      type,
      offset,
      limit,
    }, {
      withCredentials: true,
    }).then((response) => {
      console.log(response);
      dispatch({
        type: FETCH_ACTIVITY_HISTORY_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_ACTIVITY_HISTORY_FAIL,
        payload: error.code,
      });
    });
  }
}
