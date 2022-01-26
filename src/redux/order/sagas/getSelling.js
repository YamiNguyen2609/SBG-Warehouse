import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getSelling';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* getSelling(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield order.onSelling(action['data']);
    if (res['data'].length > 0) yield put(onSuccess(res['data'][0]));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getSelling);
}
