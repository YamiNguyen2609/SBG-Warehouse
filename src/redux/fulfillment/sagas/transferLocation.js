import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/transferLocation';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* transferLocation(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.transferLocation(action['data']);
    if (res['isSuccess']) {
      showMessage({
        type: 'success',
        message: 'Chuyển kho',
        description: `${action['data']['product_name']} được chuyển vào ${action['data']['location_name']} thành công `,
      });
      yield put(onSuccess(res['data']));
    } else {
      showMessage({
        type: 'warning',
        message: 'Chuyển kho',
        description: `${action['data']['product_name']} không thể chuyển kho`,
      });
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, transferLocation);
}
