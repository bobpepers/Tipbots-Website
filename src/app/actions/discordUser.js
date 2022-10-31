import axios from '../axios';
import {
  FETCH_DISCORD_USER_BEGIN,
  FETCH_DISCORD_USER_SUCCESS,
  FETCH_DISCORD_USER_FAIL,
  REVOKE_DISCORD_TOKEN_BEGIN,
  REVOKE_DISCORD_TOKEN_SUCCESS,
  REVOKE_DISCORD_TOKEN_FAIL,
  LOGIN_DISCORD_USER_BEGIN,
  LOGIN_DISCORD_USER_SUCCESS,
  LOGIN_DISCORD_USER_FAIL,
  FETCH_DISCORD_USER_IDLE,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

const mainApi = tipbotInfoArray.find((x) => x.ticker === 'RUNES');

export function loginDiscordAction() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_DISCORD_USER_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}/discord/login`)
      .then((response) => {
        window.location.href = response.data.result;
        dispatch({
          type: LOGIN_DISCORD_USER_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: LOGIN_DISCORD_USER_FAIL,
          payload: error,
        });
      });
  }
}

export function revokeDiscordTokenAction() {
  return function (dispatch) {
    dispatch({
      type: REVOKE_DISCORD_TOKEN_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}/discord/revoke`)
      .then((response) => {
        dispatch({
          type: REVOKE_DISCORD_TOKEN_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: FETCH_DISCORD_USER_IDLE,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: REVOKE_DISCORD_TOKEN_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchDiscordUserAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_DISCORD_USER_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}`)
      .then((response) => {
        if (response.data.result === 'NO_USER_FOUND') {
          dispatch({
            type: FETCH_DISCORD_USER_IDLE,
          });
        } else {
          dispatch({
            type: FETCH_DISCORD_USER_SUCCESS,
            payload: response.data.result,
          });
        }
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_DISCORD_USER_FAIL,
          payload: error,
        });
      });
  }
}
