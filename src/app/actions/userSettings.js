import axios from '../axios';
import {
  ENQUEUE_SNACKBAR,
  UPDATE_USER_SETTINGS,
  UPDATE_USER_SETTINGS_TELEGRAM,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function setUserSettings(
  tipbotInfo,
  chatClient,
  stealth,
  excludePublicStats,
  ignoreMe,
) {
  return function (dispatch) {
    axios.post(`${tipbotInfo.userApiUrl}/dashboard/config/user/settings`, {
      chatClient,
      stealth,
      excludePublicStats,
      ignoreMe,
    }, {
      withCredentials: true,
    }).then((response) => {
      dispatch({
        type: UPDATE_USER_SETTINGS,
        payload: response.data.result,
        tipbotInfo,
      });

      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: User settings updated',
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
    });
  }
}
