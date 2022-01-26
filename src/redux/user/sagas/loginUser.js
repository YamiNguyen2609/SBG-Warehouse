import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import {Buffer} from 'safe-buffer';
import moment from 'moment';

import {ACTION_LOGIN} from '../redux/loginUser';
import {flagIndicator, messageWarning, updateCompany} from '../../app';
import {setToken} from '../../../helpers/LocalStorage';
import {Colors} from '../../../assets/styles';
import {setEmployee, setVehicle, setIncidents} from '../employee';
import user from '../../../api/user';
import {store} from '../../ConfigureStore';

function* onLogin(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let employee = store.getState().employee['user'];

    if (!employee) var update_at = moment().format('YYYY-MM-DD');
    else update_at = employee['update_at'];

    if (
      (employee &&
        !action['isLogin'] &&
        update_at != moment().format('YYYY-MM-DD')) ||
      action['isLogin']
    ) {
      let base64 = Buffer.from(
        action['username'].toUpperCase() + ':' + action['password'],
      ).toString('base64');

      let res = yield user.onLogin(base64);

      if (res['isSuccess']) {
        if (res['code'] == 'USER_NOT_ACTIVATED') {
          let re_res = yield user.onLogin(base64);
          if (re_res['isSuccess']) {
            yield onSuccess(re_res['data'], action);
          } else {
            showMessage({
              message: 'Lỗi đăng nhập',
              description: re_res['message'],
              type: 'danger',
            });
          }
        } else {
          yield onSuccess(res['data'], action);
        }
      } else {
        showMessage({
          message: 'Lỗi đăng nhập',
          description: res['message'],
          type: 'danger',
        });
      }
    }
  } catch {}
  yield put(flagIndicator(false));
}

function* onSuccess(data, action) {
  const {username, password, notifyVehicle, notifyUser} = action;
  const {
    access_token,
    secret,
    access_system,
    company,
    fullname,
    expiredDays,
    expiredWarning,
    role,
    isAllowMultiStation,
    vehicle,
    warehouseFulfillment,
    merchantIds,
  } = data;
  let message = [];

  setToken({access_token, secret, access_system});

  let employee = {
    full_name: fullname,
    company_id: company == 1 || !company ? 'sbp' : 'sbs',
    username,
    password,
    role,
    is_multi: isAllowMultiStation,
    update_at: moment().format('YYYY-MM-DD'),
    merchantId: merchantIds,
    warehouse: warehouseFulfillment != '' ? warehouseFulfillment : null,
  };

  let info = yield user.onInfo(access_token, secret);

  if (info['isSuccess']) {
    const {odooBarCode, phone, licenseNumber, licenseExpire, shippingTeam} =
      info['data'];
    employee['code'] = odooBarCode;
    employee['phone'] = phone;
    employee['licenseNumber'] = licenseNumber;
    employee['licenseExpire'] = moment(licenseExpire).format('DD-MM-YYYY');
    employee['team'] = shippingTeam;
  }

  yield put(setEmployee(employee));
  yield put(updateCompany(employee['warehouse'] ? 'logi' : 'sbp'));

  if (message.length > 0) yield put(messageWarning(message));
}

export default function* saga() {
  yield takeEvery(ACTION_LOGIN, onLogin);
}
