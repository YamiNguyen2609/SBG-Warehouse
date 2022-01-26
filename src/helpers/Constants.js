import BuildConfig, {Environments} from '../config/BuildConfig';

const code = {
  SUCCESS: 200,
  TOKEN: 440,
  TOKEN_EXPIRED: 419,
  AUTHORIZED: 400,
  PERMISSION: 403,
  ERROR_SERVER: 500,
  FAIL_SERVER: 502,
};
const length = 10;

const GOOGLE_API_KEY = 'AIzaSyBjjC2b5ulaqSszn66BsNDXpE_W9Kdm_Ks';

const MQTT = {
  host: 'globex.vn',
  port: 1883,
  user: 'frontend',
  pass: 'Gl0b3x2019!#@',
};

const TOKEN_TELEGRAM = '932827191:AAGWXL3R__j4kMxE-kuiN9dcWpPaqkmnYzY';

const CHAT_ID = '-471542895';

const version = `${
  BuildConfig == Environments.DEVELOPMENT ? ' thử nghiệm' : ''
} 1.0.5.260122`;

const button = {
  SCAN_MANIFEST: 0,
  MANIFESTS: 1,
  ATTACH_VEHICLE: 2,
  DETACH_VEHICLE: 3,
  TRAFFIC_JAM: 4,
  RE_FUEL: 5,
  MORE: 6,
  SCAN_ORDER: 7,
  PUP_POD: 8,
  RESCUE_CENTER: 9,
  NOTIFY: 10,
  HISTORY: 11,
  ACCOUNT: 12,
  LOGOUT: 13,
};

const handle = {
  UPDATE_PASSWORD: 0,
  RESET_PASSWORD: 1,
};

const payments = [
  {
    id: 1,
    name: 'Tiền mặt',
    icon: 'icMoney',
  },
  {
    id: 3,
    name: 'thẻ ngân hàng',
    icon: 'icCard',
  },
  {
    id: 5,
    name: 'Ví điện tử',
    icon: 'icDebit',
  },
];

export {
  code,
  length,
  GOOGLE_API_KEY,
  MQTT,
  TOKEN_TELEGRAM,
  CHAT_ID,
  version,
  button,
  handle,
  payments,
};
