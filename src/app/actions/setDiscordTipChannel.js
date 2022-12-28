import axios from '../axios';
import {
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function setDiscordTipChannelAction(
  userApiUrl,
  serverId,
  channelId,
) {
  return function (dispatch) {
    axios.post(`${userApiUrl}/dashboard/config/channel/tip`, {
      serverId,
      channelId,
    }, {
      withCredentials: true,
    }).then((response) => {
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: `Success: Tip channel set to ${response.data.result.channel}`,
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
