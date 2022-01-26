import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/receiptOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* receiptOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    const {state, data} = action['data'];
    console.log('state', state);
    if (state == 0) {
      var res = yield fulfillment.receiptOrder(data['orderId']);
      if (res['success']) {
        showMessage({
          type: 'success',
          message: 'Nhận hàng',
          description: `Hoàn tất nhận ${data['name']}`,
        });
      }
    } else {
      res = yield fulfillment.receiptLine(data);
      if (res['success']) {
        showMessage({
          type: 'success',
          message: 'Nhận hàng',
          description: `Đã nhận số lượng ${data['quantity']} của ${data['name']}`,
        });
      }
    }

    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, receiptOrder);
}
