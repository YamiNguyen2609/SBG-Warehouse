const ACTION = 'GET_CHECK_INS';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getCheckIns = data => ({
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
  data: undefined,
};

export {getCheckIns, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      state['data'] = action['payload'];
      return {...state, flag: state['flag'] + 1};

    case ACTION_ERROR:
      return {...state, flag: state['flag'] + 1};

    default:
      return state;
  }
};
