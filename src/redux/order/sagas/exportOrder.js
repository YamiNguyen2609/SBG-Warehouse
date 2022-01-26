import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/exportOrder';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* exportOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    r.log('data export', action['data']);

    var res = yield order.exportOrder(action['data']);

    if (res['isSuccess']) {
      showMessage({
        type: 'success',
        message: 'Đơn hàng xuất kho',
        description: `Xuất kho thành công`,
      });
    }
    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, exportOrder);
}
