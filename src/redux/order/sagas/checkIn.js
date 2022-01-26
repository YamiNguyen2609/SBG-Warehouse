import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/checkIn';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import order from '../../../api/order';

function* checkIn(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    console.log('data', action);

    const {stationId, HAWB} = action['data'];
    var create = yield order.onCheckIn(0, {
      stationId,
      HAWB,
      isSendTransport: true,
    });

    let text = [];

    if (create['isSuccess']) {
      var checkIn = yield order.onCheckIn(1, {ids: HAWB});

      if (checkIn['isSuccess']) {
        showMessage({
          type: 'success',
          message: 'Check In',
          description: `Check in ${HAWB} thành công`,
        });
      } else {
        var remove = yield order.onCheckIn(2, {HAWBs: [HAWB], stationId});

        if (checkIn['message']) text.push(checkIn['message']);
        else if (checkIn['data']['data']['checkin']['error'].length > 0)
          text = checkIn['data']['data']['checkin']['error'].map(
            e => e['HAWB'] + '\n' + e['cause'],
          );
      }
    } else {
      if (create['data']['message']) {
        text.push(create['data']['message']);
      } else {
        text.push(`Không tìm thấy ${create['data']['error'].join(',')}`);
      }
    }

    if (text.length > 0) yield put(messageWarning(text));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, checkIn);
}
