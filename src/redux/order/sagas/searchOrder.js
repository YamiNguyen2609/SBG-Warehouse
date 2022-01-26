import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/searchOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* searchOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = null;

    switch (action['data']['state']) {
      case 0:
        res = yield order.onDeliveryIncomplete(action['data']);
        break;
      case 1:
        res = yield order.onDeliveryComplete(action['data']);
        break;
      case 2:
        res = yield order.onDeliveryDismiss(action['data']);
        break;
      case 3:
        res = yield order.onPickup(action['data']);
        break;
    }

    if (res && res['data']) {
      const {data, meta} = res;
      yield put(onSuccess(data[0]));
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, searchOrder);
}
