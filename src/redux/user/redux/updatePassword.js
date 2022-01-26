const ACTION = 'UPDATE_PASSWORD';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const updatePassword = data => ({
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

export {updatePassword, onSuccess, onFailure, ACTION};

const initState = {
  flagSuccess: 0,
  flagFailure: 0,
};

export default (state = initState, action) => {
  switch (action['type']) {
    case ACTION:
      return {
        ...state,
      };
    case ACTION_SUCCESS:
      state['flagSuccess'] += 1;
      return {
        ...state,
      };
    case ACTION_ERROR:
      state['flagFailure'] += 1;
      return {
        ...state,
      };

    default:
      return state;
  }
};
