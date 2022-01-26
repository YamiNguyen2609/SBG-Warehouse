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
} from '../redux/app';
import {replaceScreenWithRemoveStack} from '../redux/navigation';

const api = axios.create({
  timeout: 10000,
  baseURL: `https://${BuildConfig}api.globex.vn/tmm/api/v1`,
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
    const {isSuccess, message, error_code} = data;

    if (isSuccess == false || error_code) {
      store.dispatch(
        messageError('200', {
          url: config['url'],
          key: 'TMM',
          message: message ?? data['message'] ?? data['data']['message'],
        }),
      );
    }

    clear.runClearCache(null);
    return data;
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
      const {data, status} = response;

      store.dispatch(
        messageError(
          status,
          {
            url: config['url'],
            key: 'TMM',
            message: `${status} - ${message ?? data['message']}`,
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
