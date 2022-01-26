import {takeEvery, put} from 'redux-saga/effects';

import {
  ACTION,
  onSuccessComplete,
  onSuccessDismiss,
  onSuccessIncomplete,
} from '../redux/getOrders';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';
import vision from '../../../api/vision';

function* getOrders(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    switch (action['data']['state']) {
      case 0:
        yield getIncomplete(action['data']);
        break;
      case 1:
        yield getComplete(action['data']);
        break;
      case 2:
        yield getDismiss(action['data']);
        break;
    }
  } catch {}
  yield put(flagIndicator(false));
}

function* getIncomplete(data) {
  try {
    let results = {};
    var delivery = yield order.onDeliveryIncomplete(data);

    if (delivery['meta']['total'] > 0) {
      const {data, meta} = delivery;
      results['delivery'] = {data, total: meta['total']};
    }

    data['statusId'] = 13;
    var pickup = yield order.onPickup(data);

    if (pickup['isSuccess']) {
      const {data, meta} = pickup;
      results['pickup'] = {data, total: meta['total']};
    }

    yield put(
      onSuccessIncomplete({
        data: results,
        refreshing: data['refreshing'],
      }),
    );
  } catch {}
}

function* getComplete(data) {
  try {
    let results = {};
    var delivery = yield order.onDeliveryComplete(data);

    if (delivery['meta']['total'] > 0) {
      const {data, meta} = delivery;

      results['delivery'] = {data, total: meta['total']};
    }

    data['statusId'] = 16;
    var pickup = yield order.onPickup(data);
    if (pickup['isSuccess']) {
      const {data, meta} = pickup;
      results['pickup'] = {data, total: meta['total']};
    }
    yield put(
      onSuccessComplete({
        data: results,
        refreshing: data['refreshing'],
      }),
    );
  } catch {}
}

function* getDismiss(data) {
  try {
    let results = [];
    var delivery = yield order.onDeliveryDismiss(data);

    if (delivery['meta']['total'] > 0) {
      const {data, meta} = delivery;
      results['delivery'] = {data, total: meta['total']};
    }

    data['statusId'] = 102;
    var pickup = yield order.onPickup(data);

    if (pickup['isSuccess']) {
      const {data, meta} = pickup;
      results['pickup'] = {data, total: meta['total']};
    }

    yield put(
      onSuccessDismiss({
        data: results,
        refreshing: data['refreshing'],
      }),
    );
  } catch {}
}

export default function* saga() {
  yield takeEvery(ACTION, getOrders);
}
