import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/reportVehicle';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import vehicle from '../../../api/vehicle';

function* reportVehicle(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    res = yield vehicle.onReport(action['data']);
    if (res['success'])
      showMessage({
        type: 'success',
        message: 'Báo cáo sự cố',
        description: 'Báo cáo sự cố của xe thành công',
      });
    else {
      showMessage({
        type: 'warning',
        message: 'Báo cáo sự cố',
        description: 'Báo cáo sự cố của xe thất bại',
      });
    }

    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, reportVehicle);
}
