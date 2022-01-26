import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import FS from 'react-native-fs';

import {ACTION, onFailure, onSuccess} from '../redux/uploadManifest';
import {getManifests} from '../redux/getManifests';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import manifest from '../../../api/manifest';

function* uploadManifest(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield manifest.uploadManifest(action['data']);

    FS.unlink(`${FS.ExternalDirectoryPath}/${action['data']['code']}/`);

    if (res['success']) {
      showMessage({
        message: 'Upload Manifest',
        description: `Bill ${action['data']['code']} upload thành công`,
        type: 'success',
      });
    } else if (res['error_code'] == 'BILL_ID_CONFLICT')
      showMessage({
        message: 'Upload Manifest',
        description: `Bill ${action['data']['code']} đã được upload`,
        type: 'warning',
      });

    yield put(getManifests({get_thumbs: 1, page_number: 1}));

    yield put(onSuccess(true));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, uploadManifest);
}
