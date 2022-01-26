import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/getLot';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* getLot(action) {
  try {
    // yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.getLocation(action['data']);
    if (res['isSuccess']) {
      yield put(onSuccess(res['data']));
    } else {
      showMessage({
        type: 'warning',
        message: 'Kiểm tra location',
        description: 'Location không tồn tại trong hệ thống',
      });
    }
  } catch {}
  // yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getLot);
}
