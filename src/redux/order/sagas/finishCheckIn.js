import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/finishCheckIn';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* finishCheckIn(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield order.onCheckIn(3, action['data']);

    if (res['isSuccess']) {
      showMessage({
        type: 'success',
        message: 'Hoàn tất check in',
        description: 'Đợt check in đã hoàn tất',
      });
      yield put(onSuccess(true));
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, finishCheckIn);
}
