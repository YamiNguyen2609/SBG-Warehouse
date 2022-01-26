import {takeEvery, put} from 'redux-saga/effects';

import {ACTION_SUCCESS} from '../redux/trafficJam';
import {store} from '../../ConfigureStore';
import MqttConfig from '../../../config/MqttConfig';

function* trafficJam(action) {
  try {
    const employee = store.getState().employee;
    const location = store.getState().listenLocation.data;
    const state = store.getState().trafficJam.state;

    // if (
    //   employee['user'] &&
    //   employee['vehicle'] &&
    //   state &&
    //   location['lat'] &&
    //   location['long']
    // ) {
    if (true) {
      let data = {
        driver_id: employee['user']['code'],
        driver_name: employee['user']['full_name'],
        license_plates: employee['vehicle']['license_plate'],
        lat: String(location['lat']),
        long: String(location['long']),
        status: state,
        comment: 'Kẹt xe',
      };

      const subscribe = '/traffic_jam';
      const code = employee['user']['username'].substring(
        employee['user']['username'].length - 4,
      );
      const client = yield MqttConfig.Config({
        clientId: `${code}-traffic`,
        keepalive: 86400,
      });

      console.log('subscribe', subscribe);
      client.on('connect', () => {
        console.log('you are connected!!!!');
        client.subscribe(subscribe, 0);
        console.log('subscribe success!!!!');
        client.publish(subscribe, JSON.stringify(data), 0, false);

        console.log('push message success!!!!');
      });

      client.connect();
    }
  } catch {}
}

export default function* saga() {
  yield takeEvery(ACTION_SUCCESS, trafficJam);
}
