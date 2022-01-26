const ACTION = 'GET_PRODUCTS_PICK';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getProductsPick = data => ({
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
  data: [],
  defaultData: [],
  lines: [],
  flag: 0,
  zones: [],
};

export {getProductsPick, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      state.data = [];
      return {...state};

    case ACTION_SUCCESS: {
      return {...state, flag: state['flag'] + 1, ...action['payload']};
    }

    case ACTION_ERROR:
      return {...state, flag: state['flag'] + 1};

    default:
      return state;
  }
};
