import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/transferOrder';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* transferOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield order.onTransfer(action['data']);

    if (!res['isSuccess']) {
      let message = res['data']['error'].map(
        e => `${e['orderNumber']} - ${e['cause']}`,
      );
      yield put(messageWarning([message]));
    } else {
      showMessage({
        type: 'success',
        message: 'Chuyển giao nhận',
        description: `${action['data']} chuyển giao nhận hoàn tất`,
      });
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, transferOrder);
}
