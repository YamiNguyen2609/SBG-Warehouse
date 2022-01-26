const ACTION = 'TRAFFIC_JAM';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const trafficJam = data => ({
  type: ACTION,
  data,
});

const onUpdateLocation = data => ({
  type: ACTION_SUCCESS,
  data,
});

const onFailure = data => ({
  type: ACTION_ERROR,
  data,
});

const initialState = {
  flag: 0,
  state: false,
};

export {ACTION_SUCCESS, trafficJam, onUpdateLocation, onFailure};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      state['state'] =
        action['data'] != undefined ? action['data'] : !state['state'];
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
