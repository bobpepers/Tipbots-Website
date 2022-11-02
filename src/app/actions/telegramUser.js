import axios from '../axios';
import {
  FETCH_TELEGRAM_USER_BEGIN,
  FETCH_TELEGRAM_USER_SUCCESS,
  FETCH_TELEGRAM_USER_FAIL,
  REVOKE_TELEGRAM_TOKEN_BEGIN,
  REVOKE_TELEGRAM_TOKEN_SUCCESS,
  REVOKE_TELEGRAM_TOKEN_FAIL,
  LOGIN_TELEGRAM_USER_BEGIN,
  LOGIN_TELEGRAM_USER_SUCCESS,
  LOGIN_TELEGRAM_USER_FAIL,
  FETCH_TELEGRAM_USER_IDLE,
  FETCH_TELEGRAM_USER_BALANCE_IDLE,
} from './types/index';

import { notistackErrorAdd } from './helpers/notistackError';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

const mainApi = tipbotInfoArray.find((x) => x.ticker === 'RUNES');

export function loginTelegramAction() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_TELEGRAM_USER_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}/telegram/login`, { withCredentials: true })
      .then((response) => {
        window.location.href = response.data.result;
        dispatch({
          type: LOGIN_TELEGRAM_USER_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: LOGIN_TELEGRAM_USER_FAIL,
          payload: error.code,
        });
      });
  }
}

export function revokeTelegramTokenAction() {
  return function (dispatch) {
    dispatch({
      type: REVOKE_TELEGRAM_TOKEN_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}/telegram/revoke`, { withCredentials: true })
      .then((response) => {
        dispatch({
          type: REVOKE_TELEGRAM_TOKEN_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: FETCH_TELEGRAM_USER_IDLE,
        });
        dispatch({
          type: FETCH_TELEGRAM_USER_BALANCE_IDLE,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: REVOKE_TELEGRAM_TOKEN_FAIL,
          payload: error.code,
        });
      });
  }
}

export function fetchTelegramUserAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_TELEGRAM_USER_BEGIN,
    });
    axios.get(`${mainApi.userApiUrl}/telegram`, { withCredentials: true })
      .then((response) => {
        if (response.data.result === 'NO_USER_FOUND') {
          dispatch({
            type: FETCH_TELEGRAM_USER_IDLE,
          });
        } else {
          dispatch({
            type: FETCH_TELEGRAM_USER_SUCCESS,
            payload: response.data.result,
          });
        }
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_TELEGRAM_USER_FAIL,
          payload: error.code,
        });
      });
  }
}
