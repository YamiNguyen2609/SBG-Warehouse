import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/updateFuel';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import vehicle from '../../../api/vehicle';

function* updateFuel(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    res = yield vehicle.onFuel(action['data']);
    yield put(onSuccess(true));
    showMessage({
      type: 'success',
      message: 'Cập nhật nhiên liệu',
      description: `Bạn đã cập nhật ${action['data']} lit cho xe`,
    });
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, updateFuel);
}
