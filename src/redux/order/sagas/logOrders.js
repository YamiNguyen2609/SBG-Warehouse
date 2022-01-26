import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';
import moment from 'moment';

import {ACTION, onFailure, onSuccess} from '../redux/logOrders';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';
import {formatPrice} from '../../../helpers/Utils';

function* logOrders(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = [];
    let orderId = action['data']['orderId'];
    delete action['data']['orderId'];
    var log = yield order.onLog(action['data']);
    var accounting = yield order.onLogAccounting(orderId);

    if (Number(log['meta']['total']) > 0) {
      res = res.concat(
        log['data'].map(e => {
          if (e['updatedAt']) {
            let spl = e['updatedAt'].split(' ');
            let date = spl[1].split('-').reverse().join('-');
            return {
              code: e['statusId'],
              message: e['statusId'] == 38 ? 'Huỷ giao hàng' : 'Đã giao hàng',
              description: e['status_name']['vi'],
              date: moment(`${date} ${spl[0]}`).format('YYYY-MM-DD HH:mm'),
            };
          }
        }),
      );
    }

    if (accounting['isSuccess']) {
      res = accounting['data']
        .map(e => {
          return {
            code: 0,
            message: 'Kế toán thu tiền',
            description: `Đã thu ${formatPrice(e['codPaid'])} VNĐ - ${
              e['paymentMethod']['name']
            }`,
            date: moment(e['createdAt']).format('YYYY-MM-DD HH:mm'),
          };
        })
        .concat(res);
    }

    if (res.length > 0) res.sort((a, b) => b['date'] - a['date']);

    console.log(res);

    yield put(onSuccess(res));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, logOrders);
}
