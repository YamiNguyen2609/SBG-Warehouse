const ACTION = 'GET_RECEIPTS';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
import r from 'reactotron-react-native';

const getReceipts = data => ({
  type: ACTION,
  data,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = payload => ({
  type: ACTION_ERROR,
  payload,
});

const initialState = {
  flag: 0,
  inReceipt: {
    flag: 0,
    data: [],
    total: 0,
  },
  receipt: {
    flag: 0,
    data: [],
    total: 0,
  },
};

export {getReceipts, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      if (action['data']['offset'] == 1) {
        state['inReceipt']['data'] = [];
        state['receipt']['data'] = [];
      }
      return {...state};

    case ACTION_SUCCESS: {
      const {inReceipt, receipt} = action['payload'];
      state['inReceipt']['data'] = state['inReceipt']['data'].concat(
        inReceipt['data'],
      );
      state['inReceipt']['flag'] += 1;
      state['inReceipt']['total'] = inReceipt['total'];

      state['receipt']['data'] = state['receipt']['data'].concat(
        receipt['data'],
      );
      state['receipt']['flag'] += 1;
      state['receipt']['total'] = receipt['total'];
      return {...state, flag: state['flag'] + 1};
    }

    case ACTION_ERROR:
      return {...state, flag: state['flag'] + 1};

    default:
      return state;
  }
};
