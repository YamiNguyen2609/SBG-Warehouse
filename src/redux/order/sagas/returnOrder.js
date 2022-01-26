import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/returnOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';
import fulfillment from '../../../api/fulfillment';
import {store} from '../../ConfigureStore';

function* returnOrder(action) {
  try {
    console.log('get order return', action['data']);
    yield put(flagIndicator(true, {color: Colors.appColor}));

    const item = action['data']['orderNumber'].toUpperCase();
    var res = yield order.getOrderReturn(item);

    if (res['isSuccess'] && res['data'].length > 0) {
      let orderLineIds = [];
      let warehouseId = store.getState()['employee']['user']['warehouse'];
      let merchantId = store.getState()['employee']['user']['merchantId'];

      res['data'].forEach(
        e => (orderLineIds = orderLineIds.concat(e['details.odooSubLineIds'])),
      );

      orderLineIds = orderLineIds.map(x => {
        return {
          id: x,
          reason: action['data']['reason'],
        };
      });

      r.log('data', {
        orderLineIds,
        warehouseId,
        merchantId,
      });

      var response = yield fulfillment.returnOrder({
        orderLineIds,
        warehouseId,
        merchantId,
      });

      if (response['success']) {
        showMessage({
          type: 'success',
          message: 'Scan đơn hàng xuất kho',
          description: `${item} trả về kho`,
        });
        yield put(onSuccess(response));
      } else {
        yield put(onFailure());
      }
    } else {
      showMessage({
        type: 'warning',
        message: 'Scan đơn hàng xuất kho',
        description: `${item} không tồn tại trong hệ thống`,
      });
      yield put(onFailure());
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, returnOrder);
}
