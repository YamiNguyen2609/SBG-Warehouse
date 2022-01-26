import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onSuccess} from '../redux/listenOrder';
import {flagIndicator} from '../../app';
import MqttConfig from '../../../config/MqttConfig';

import {store} from '../../ConfigureStore';

function* listenOrder(action) {
  try {
    const {code} = action['data'];

    const subscribe = `${code}-orders`;

    const client = yield MqttConfig.Config({
      clientId: subscribe,
      keepalive: 86400,
    });

    console.log('subscribe', subscribe);
    client.on('connect', () => {
      console.log('you are connected!!!!');
      client.subscribe(subscribe, 0);
      client.on('message', function (msg) {
        console.log('co mes nes');
        console.log('mess', msg.data.toString());
        const mess = JSON.parse(msg.data.toString());
        const {cmd} = mess;
        store.dispatch(onSuccess(true));
        showMessage({
          type: 'info',
          message: 'Thông báo từ hệ thống',
          description: `Bạn có đơn hàng ${
            cmd == 'delivery' ? 'giao' : 'nhận'
          } mới`,
        });
      });

      console.log('listen success');
    });
    client.connect();
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, listenOrder);
}
