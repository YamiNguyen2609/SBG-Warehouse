import {takeEvery, put} from 'redux-saga/effects';

import {ACTION, onFailure, onSuccess} from '../redux/getManifests';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import manifest from '../../../api/manifest';

function* getManifests(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var resManifests = yield manifest.getManifests({get_thumbs: 0});

    if (
      resManifests['success'] &&
      Object.keys(resManifests['result']).length > 0
    )
      action['data']['page_length'] =
        resManifests['result']['bill_list'].length;

    var res = yield manifest.getManifests(action['data']);

    if (res['success']) {
      yield put(
        onSuccess({
          data: res['result']['bill_list'],
          manifestData: resManifests['result']['bill_list'],
        }),
      );
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getManifests);
}
