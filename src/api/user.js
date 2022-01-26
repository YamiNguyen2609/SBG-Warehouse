import {length} from '../helpers/Constants';
import Auth from './AuthConfig';

const LOGIN = '/mobile/login';
const INFO = '/mobile/me';
const UPDATE_PASSWORD = '/changePassword';
const LOG = '/driver/log';

const onLogin = base64 => {
  return Auth.get(LOGIN, {
    headers: {
      Authorization: 'Basic ' + base64,
    },
  });
};

const onInfo = (token, secret) => {
  return Auth.get(INFO, {
    headers: {
      'access-token': `Bearer ${token}`,
      secret,
    },
  });
};

const onUpdatePassword = (currentPassword, newPassword, token, secret) => {
  return Auth.put(
    UPDATE_PASSWORD,
    {currentPassword, newPassword},
    {
      headers: {
        'access-token': `Bearer ${token}`,
        secret,
      },
    },
  );
};

export default {onLogin, onInfo, onUpdatePassword};
