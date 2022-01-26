import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getOrder';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* getOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    const item = action['data']['value'].toUpperCase();
    var res = yield order.onInfo(item);

    if (res['data'].length > 0) {
      var data = res['data'][0];
      data['selected'] = true;
      data['isScan'] = action['data']['isScan'];
      data['isExist'] = true;
      data['index'] = action['data']['index'];
      yield put(onSuccess(data));
    } else {
      showMessage({
        type: 'warning',
        message: 'Scan đơn hàng booking',
        description: 'Đơn hàng không tồn tại trong hệ thống',
      });
    }
    // } else {
    //   data = {
    //     index: action['data']['index'],
    //     selected: true,
    //     isExist: false,
    //     orderNumber: item,
    //     senderFee: 0,
    //     pcs: 0,
    //     orderWeightKg: 0,
    //     unitFee: 'VND',
    //     orderNumberClient: '',
    //     receiverData: null,
    //     senderData: null,
    //     remark: null,
    //     id: null,
    //   };
    // }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getOrder);
}
