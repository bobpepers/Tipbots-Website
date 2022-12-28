import axios from '../axios';
import {
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function setDiscordFaucetChannelAction(
  userApiUrl,
  serverId,
  channelId,
) {
  return function (dispatch) {
    axios.post(`${userApiUrl}/dashboard/config/channel/faucet`, {
      serverId,
      channelId,
    }, {
      withCredentials: true,
    }).then((response) => {
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: `Success: Faucet channel set to ${response.data.result.channel}`,
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
