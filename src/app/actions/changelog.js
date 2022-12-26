import axios from '../axios';
import {
  FETCH_CHANGELOG_BEGIN,
  FETCH_CHANGELOG_SUCCESS,
  FETCH_CHANGELOG_FAIL,
} from './types/index';

export function fetchChangelogAction(
  userApiUrl,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_CHANGELOG_BEGIN,
    });
    axios.get(`${userApiUrl}/changelog`, { withCredentials: true })
      .then((response) => {
        dispatch({
          type: FETCH_CHANGELOG_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_CHANGELOG_FAIL,
          payload: error.code,
        });
      });
  }
}
