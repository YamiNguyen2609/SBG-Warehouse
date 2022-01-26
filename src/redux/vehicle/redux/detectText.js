const ACTION = 'DETECT_TEXT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const detectText = data => ({
  type: ACTION,
  data,
});

const onSuccess = data => ({
  type: ACTION_SUCCESS,
  data,
});

const onFailure = data => ({
  type: ACTION_ERROR,
  data,
});

const initialState = {
  data: undefined,
  flag: 0,
};

export {ACTION, detectText, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};
    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state['flag'] + 1,
        data: action['data'],
      };
    case ACTION_ERROR:
      return {
        ...state,
        flag: state['flag'] + 1,
      };
    default:
      return state;
  }
};
