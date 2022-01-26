import {takeEvery, put} from 'redux-saga/effects';
import Location from 'react-native-location';

import {ACTION, onSuccess} from '../redux/listenLocation';
import {updateLocation} from '../redux/updateLocation';
import {onUpdateLocation} from '../../vehicle/redux/trafficJam';
import {store} from '../../ConfigureStore';

function* listenLocation(action) {
  try {
    Location.configure({
      distanceFilter: 0, // Meters
      desiredAccuracy: {
        android: 'balancedPowerAccuracy',
      },
      androidProvider: 'auto',
      interval: 30 * 1000,
      fastestInterval: 120 * 1000,
      maxWaitTime: 30 * 1000,
    });

    Location.requestPermission({
      android: {
        detail: 'coarse',
        rationale: {
          title: 'Chúng tôi cần truy cập vị trí của bạn',
          message: 'Chúng tôi cần truy cập vị trí để xác định và hổ trợ bạn',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Huỷ',
        },
      },
    }).then(granted => {
      if (granted) {
        Location.subscribeToLocationUpdates(location => {
          if (location.length > 0) {
            const {longitude, latitude} = location[0];
            let data = {
              lat: latitude.toFixed(6),
              long: longitude.toFixed(6),
            };
            console.log(data);
            store.dispatch(updateLocation(data));
            store.dispatch(onSuccess(data));
            const state = store.getState().trafficJam.state;

            console.log('state', state);

            if (state) {
              store.dispatch(onUpdateLocation(null));
            }
          }
        });
      }
    });
  } catch {}
}

export default function* saga() {
  yield takeEvery(ACTION, listenLocation);
}
