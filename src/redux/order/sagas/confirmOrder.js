import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/confirmOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';
import {getOrders} from '../redux/getOrders';

function* confirmOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    const state = action['data']['state'];
    console.log('data', action['data'], state);
    delete action['data']['state'];
    switch (state) {
      case 0:
        yield successBooking(action['data']);
        break;

      case 1:
        yield successOrder(action['data']);
        break;

      case 2:
        yield cancelOrder(action['data']);
        break;
    }
    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

function* successBooking(data) {
  const bookingNumber = data['bookingNumber'];
  delete data['bookingNumber'];
  var res = yield order.onSuccessPickup(data);

  if (res['isSuccess']) {
    showMessage({
      type: 'success',
      message: 'Hoàn tất đơn hàng',
      description: `Booking ${bookingNumber} đã hoàn tất`,
    });
    yield put(getOrders({offset: 0, state: 0, refreshing: true}));
  }
}

function* cancelOrder(data) {
  const orderNumber = data['orderNumber'];
  delete data['orderNumber'];
  var res = yield order.onFailureDelivery(data);

  if (res['isSuccess']) {
    showMessage({
      type: 'success',
      message: 'Hủy giao hàng thành công',
      description: `Đơn hàng ${orderNumber} đã hủy hoàn tất`,
    });
    yield put(getOrders({offset: 0, state: 0, refreshing: true}));
    yield put(getOrders({offset: 0, state: 2, refreshing: true}));
  }
}

function* successOrder(data) {
  const orderNumber = data['orderNumber'];
  delete data['orderNumber'];
  var payment = yield order.onUpdateAmount(data);

  if (payment['isSuccess']) {
    var res = yield order.onSuccessDelivery(data);
    if (res['isSuccess'])
      showMessage({
        type: 'success',
        message: 'Giao hàng thành công',
        description: `Đơn hàng ${orderNumber} đã được giao`,
      });
  }
  yield put(getOrders({offset: 0, state: 0, refreshing: true}));
  yield put(getOrders({offset: 0, state: 1, refreshing: true}));
  yield put(onSuccess(true));
}

export default function* saga() {
  yield takeEvery(ACTION, confirmOrder);
}
