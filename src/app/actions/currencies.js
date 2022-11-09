import axios from '../axios';
import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
} from './types/index';

export function fetchCurrenciesAction(
  userApiUrl,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_PRICECURRENCIES_BEGIN,
    });
    axios.get(`${userApiUrl}/currencies`).then((response) => {
      dispatch({
        type: FETCH_PRICECURRENCIES_SUCCESS,
        payload: response.data.result,
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_PRICECURRENCIES_FAIL,
        payload: error,
      });
    });
  }
}
