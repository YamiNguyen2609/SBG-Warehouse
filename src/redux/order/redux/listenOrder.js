const ACTION = 'LISTEN_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const listenOrder = data => ({
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
};

export {listenOrder, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {...state, flag: state['flag'] + 1};

    case ACTION_ERROR:
      return {...state, flag: state['flag'] + 1};

    default:
      return state;
  }
};
