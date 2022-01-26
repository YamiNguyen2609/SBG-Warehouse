import axios from 'axios';
import _ from 'lodash';
import r from 'reactotron-react-native';
import clear from 'react-native-clear-cache';

import BuildConfig from '../config/BuildConfig';
import {getToken} from '../helpers/LocalStorage';
import {store} from '../redux/ConfigureStore';
import {
  showFlagMessage,
  hideFlagMessage,
  flagIndicator,
  messageError,
  messageWarning,
} from '../redux/app';
import {replaceScreenWithRemoveStack} from '../redux/navigation';

const api = axios.create({
  timeout: 10000,
  baseURL: `https://${BuildConfig}api.globex.vn/tmm/merchant`,
});

api.interceptors.request.use(async config => {
  const token = await getToken();
  const res = JSON.parse(token);
  config.headers['authorization'] = 'Bearer ' + res['access_token'];
  config.headers['secret'] = res['secret'];
  return config;
});
api.interceptors.response.use(
  response => {
    const {data, config} = response;
    const {isSuccess, message, error_code, success, error} = data;

    if (isSuccess == false || error_code || success == false || error) {
      let mess = message ?? data['message'];

      if (error) {
        mess = error['data']['message'];
      }

      store.dispatch(
        messageError('200', {
          url: config['url'],
          key: 'ERP',
          message: mess,
        }),
      );
    }

    clear.runClearCache(null);
    return data.result;
  },
  error => {
    const {response, config, message} = error;

    if (message == 'Network Error') {
      store.dispatch(
        showFlagMessage({
          message: 'Không thể kết nối internet',
          buttons: [
            {
              title: 'Đồng ý',
              onPress: () => {
                store.dispatch(hideFlagMessage());
                store.dispatch(replaceScreenWithRemoveStack('Home'));
              },
            },
          ],
        }),
      );
    } else {
      r.log('res', response);
      const {data, status} = response;

      store.dispatch(
        messageError(
          status,
          {
            url: config['url'],
            key: 'ERP',
            message: `${status} - ${data['message'] ?? message}`,
          },
          true,
        ),
      );

      store.dispatch(flagIndicator(false));
      clear.runClearCache(null);
      return data;
    }
  },
);

export default api;
