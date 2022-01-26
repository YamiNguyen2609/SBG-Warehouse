import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/putOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* putOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.putOrder(action['data']);
    if (res['isSuccess']) {
      showMessage({
        type: 'success',
        message: 'Put đơn hàng',
        description: 'Đơn hàng put thành công vào location',
      });
      yield put(onSuccess(res['data']));
    } else {
      showMessage({
        type: 'warning',
        message: 'Put đơn hàng',
        description: 'Đơn hàng đã dược put',
      });
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, putOrder);
}
