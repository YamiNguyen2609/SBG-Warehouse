const ACTION = 'HANDLE_VEHICLE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const handleVehicle = data => ({
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
  flag: 0,
};

export {ACTION, handleVehicle, onFailure, onSuccess};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state['flag'] + 1,
      };

    default:
      return state;
  }
};
