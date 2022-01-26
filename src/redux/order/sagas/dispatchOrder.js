import {takeEvery, put} from 'redux-saga/effects';

import {ACTION, onFailure, onSuccess} from '../redux/dispatchOrder';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';
import {showMessage} from 'react-native-flash-message';
import {getOrders} from '../redux/getOrders';

function* dispatchOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let text = [];
    for (i = 0; i < action['data'].length; i++) {
      let item = action['data'][i].toUpperCase();
      var res = yield order.onDispatch([item]);

      if (!res['isSuccess']) {
        text.push(`${item} - ${res['error'] ?? res['data']['message']}`);
      }
    }
    yield put(getOrders({offset: 0, state: 0, refreshing: true}));
    if (text.length > 0) {
      yield put(messageWarning(text));
    } else {
      showMessage({
        type: 'success',
        message: 'Phân công đi giao',
        description: 'Phân công đi giao thành công',
      });
    }

    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, dispatchOrder);
}
