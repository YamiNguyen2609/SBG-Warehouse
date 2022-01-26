import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/updatePassword';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import {setPassword} from '../employee';
import user from '../../../api/user';
import {handle} from '../../../helpers/Constants';
import {getToken} from '../../../helpers/LocalStorage';

function* updatePassword(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    const {type, oldPassword, newPassword} = action['data'];

    if (type == handle.UPDATE_PASSWORD) {
      let token = yield getToken();
      token = JSON.parse(token);
      const {access_token, secret} = token;

      var res = yield user.onUpdatePassword(
        oldPassword,
        newPassword,
        access_token,
        secret,
      );

      if (res['isSuccess']) {
        showMessage({
          type: 'success',
          message: 'Cập nhật mật khẩu',
          description: 'Mật khẩu đã được cập nhật',
          duration: 10,
        });
        yield put(setPassword(newPassword));
        yield put(onSuccess(true));
      }
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, updatePassword);
}
