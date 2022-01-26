import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getLots';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* getLots(action) {
  try {
    let data = [];
    // yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.getLocations(action['data']);
    if (res['isSuccess']) {
      data = data.concat(
        res['data'].map(e => {
          let value = e['locationName'];
          if (e['quantity']) value += ` (SL: ${e['quantity']})`;
          return {
            id: e['locationId'],
            value,
            quantity: e['quantity'],
            isScrap: false,
          };
        }),
      );
    }
    let res_temp = yield fulfillment.getLocationScraps(action['data']);
    if (res_temp['success']) {
      data.push({
        id: res_temp['data']['locationId'],
        value: res_temp['data']['locationName'],
        quantity: 0,
        isScrap: true,
      });
    }

    r.log('data', data);

    yield put(onSuccess(data));
  } catch {}
  // yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getLots);
}
