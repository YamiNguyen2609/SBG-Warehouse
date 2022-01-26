import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getStations';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* getStations(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield order.onStations(action['data']);
    if (res['data']) yield put(onSuccess(res['data']));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getStations);
}
