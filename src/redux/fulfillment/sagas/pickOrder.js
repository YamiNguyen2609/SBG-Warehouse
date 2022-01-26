import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import {store} from '../../ConfigureStore';

import {ACTION, onFailure, onSuccess} from '../redux/pickOrder';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';

function* pickOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let results = [];
    r.log('pick items', action['data']);
    for (let index = 0; index < action['data']['data'].length; index++) {
      const element = action['data']['data'][index];
      element['warehouseId'] = store.getState().employee.user.warehouse;
      let res = yield fulfillment.pickOrder(element);
      if (res['isSuccess']) {
        results.push(element);
      }
      // results.push(element);
    }

    yield put(
      messageWarning(
        results.map(x => `${x['orderName']} pick số lượng ${x['quantity']}`),
      ),
    );

    yield put(onSuccess(results));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, pickOrder);
}
