import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getReceipt';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* getReceipt(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.getOrderCode(action['data']);
    if (res['success']) {
      yield put(onSuccess(res['data']));
    } else {
      res = yield fulfillment.getOrderId(action['data']);

      if (res['success']) yield put(onSuccess(res['data']));
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getReceipt);
}
