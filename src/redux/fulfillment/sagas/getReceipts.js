import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getReceipts';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';
import {length} from '../../../helpers/Constants';

function* getReceipts(action) {
  try {
    let data = {
      inReceipt: {
        flag: 0,
        data: [],
        total: 0,
      },
      receipt: {
        flag: 0,
        data: [],
        total: 0,
      },
    };
    yield put(flagIndicator(true, {color: Colors.appColor}));
    const {state, orderType, offset} = action['data'];
    if (state == -1 || state == 0) {
      let resIn = yield fulfillment.getOrderNew({
        orderType,
        offset,
        limit: length,
      });
      if (resIn['success']) {
        data['inReceipt'] = {
          data: resIn['data'],
          total: resIn['total'],
        };
      }
    }
    if (state == -1 || state == 1) {
      let res = yield fulfillment.getOrderReceipts({
        orderType,
        offset,
        limit: length,
      });
      if (res['success']) {
        data['receipt'] = {
          data: res['data'],
          total: res['total'],
        };
      }
    }

    yield put(onSuccess(data));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getReceipts);
}
