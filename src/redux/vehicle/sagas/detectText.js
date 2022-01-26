import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/detectText';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import vision from '../../../api/vision';

function* detectText(action) {
  try {
    const {isVehicle, data} = action['data'];
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield vision.detectText(data);

    if (res['status'] == 200) {
      let data = res['data']['responses'][0];
      if (isVehicle) yield detach(data['textAnnotations']);
      else yield attach(data['fullTextAnnotation']);
    }
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, detectText);
}

function* attach(data) {
  let regex = /\d{2}\s?-?\s?[A-Z]{1,2}\d?(\s|-|)(\d{5}|\d{3}.\d{2}|\d{4})/;

  let text = String(data).match(regex);

  console.log('text', text);

  if (text.length > 0)
    yield put(onSuccess(String(text[0]).replace(/[\n]/g, ' ')));
  else
    showMessage({
      type: 'warning',
      message: 'Cảnh báo',
      description: 'Không tìm thấy biển số xe trong ảnh',
    });
}

function* detach(data) {
  let text = data.filter(e => {
    return (
      e.description.toString().replace(/[,]/g, '').replace(/[.]/g, '').length >=
        5 && Number(e.description.replace(/[,]/g, '-').replace(/[.]/g, '-')) > 0
    );
  });

  console.log('text', text);

  if (text.length == 1)
    yield put(onSuccess(String(text[0].description).substring(0, 6)));
  else
    showMessage({
      type: 'warning',
      message: 'Cảnh báo',
      description: 'Không tìm thấy số công tơ mét trong ảnh',
    });
}
