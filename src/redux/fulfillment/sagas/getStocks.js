import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onFailure, onSuccess} from '../redux/getStocks';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* getStocks(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let res = yield fulfillment.getLocation(action['data']);
    if (res['isSuccess']) {
      let data = res['data'];
      res = yield fulfillment.getStocks(data['locationId']);

      let items = [];

      if (res['data']) {
        let keys = Object.keys(res['data']);

        for (let index = 0; index < keys.length; index++) {
          const element = res['data'][keys[index]];
          items.push(element);
        }
      }

      yield put(onSuccess(items));
    } else {
      showMessage({
        type: 'warning',
        message: 'Kiểm tra location',
        description: 'Location không tồn tại trong hệ thống',
      });
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getStocks);
}
