import {takeEvery, put} from 'redux-saga/effects';

import {ACTION, onFailure, onSuccess} from '../redux/logUser';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import user from '../../../api/user';

function* logUser(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    const {offset} = action['data'];

    var res = yield user.onLog(offset);

    if (res['data']) {
      yield put(onSuccess({data: res['data'], total: res['total']}));
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, logUser);
}
