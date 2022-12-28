import axios from '../axios';
import {
  ENQUEUE_SNACKBAR,
  UPDATE_DISCORD_USER_BALANCE_SERVER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function setDiscordFaucetChannelAction(
  tipbotInfo,
  serverId,
  channelId,
) {
  return function (dispatch) {
    axios.post(`${tipbotInfo.userApiUrl}/dashboard/config/channel/faucet`, {
      serverId,
      channelId,
    }, {
      withCredentials: true,
    }).then((response) => {
      dispatch({
        type: UPDATE_DISCORD_USER_BALANCE_SERVER,
        payload: response.data.result,
        tipbotInfo,
      });
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
