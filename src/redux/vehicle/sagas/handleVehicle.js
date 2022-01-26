import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/handleVehicle';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import vehicle from '../../../api/vehicle';
import {setVehicle} from '../../user/employee';

function* handleVehicle(action) {
  try {
    const {isVehicle, data} = action['data'];
    yield put(flagIndicator(true, {color: Colors.appColor}));

    if (!isVehicle)
      var res = yield vehicle.onAttach(
        data.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
      );
    else res = yield vehicle.onDetach(data);

    if (res['success']) {
      showMessage({
        type: 'success',
        message: isVehicle ? 'Trả xe' : 'Nhận xe',
        description: `${isVehicle ? 'Trả xe' : 'Nhận xe'} thành công`,
      });
      yield put(setVehicle(!isVehicle ? null : null));
      yield put(onSuccess(true));
    } else {
      if (res['error_code'] == 'VEHICLE_NOT_AVAILABLE')
        var text = res['info']['driver_name'] + ' đang nhận xe';
      else if (res['error_code'] == 'VEHICLE_NOT_FOUND')
        text = 'Xe chưa được đăng kí trong hệ thống';

      showMessage({
        type: 'warning',
        message: `Lỗi ${isVehicle ? 'trả xe' : 'nhận xe'}`,
        description: text,
      });
    }

    if (res['warning'] && res['success'])
      yield put(messageWarning([res['data']['warning']]));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, handleVehicle);
}
