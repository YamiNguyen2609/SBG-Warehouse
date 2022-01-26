import {takeEvery, put} from 'redux-saga/effects';

import {ACTION, onSuccess} from '../redux/updateLocation';
import vehicle from '../../../api/vehicle';

function* updateLocation(action) {
  try {
    yield vehicle.onTracking(action['data']);
  } catch {}
}

export default function* saga() {
  yield takeEvery(ACTION, updateLocation);
}
