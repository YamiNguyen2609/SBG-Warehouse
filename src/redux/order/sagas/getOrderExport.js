import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getOrderExport';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* getOrderExport(action) {
  try {
    console.log('get order export', action['data']);
    yield put(flagIndicator(true, {color: Colors.appColor}));

    const item = action['data'].toUpperCase();
    var res = yield order.getOrderExport(item);

    if (res['isSuccess'] && res['data'].length > 0) {
      let data = {
        id: '',
        products: [],
      };
      res['data'].forEach(e => {
        if (!data['id']) {
          data = {
            id: e['id'],
            externalOrderNumber: e['details.orderNumberExpress'],
            orderNumber: e['orderNumber'],
            details: e['details.detailId'],
            partner: e['partner.name'],
            products: [e],
          };
        } else {
          data['details'] += ',' + e['details.detailId'];
          data['products'].push(e);
        }
      });
      showMessage({
        type: 'success',
        message: 'Scan đơn hàng xuất kho',
        description: `${item} được thêm vào danh sách`,
      });
      yield put(onSuccess(data));
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
  yield takeEvery(ACTION, getOrderExport);
}
