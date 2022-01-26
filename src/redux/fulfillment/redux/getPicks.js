import r from 'reactotron-react-native';
const ACTION = 'GET_PICKS';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getPicks = data => ({
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
  pick: {
    flag: 0,
    data: [],
    total: 0,
  },
  allocated: {
    flag: 0,
    data: [],
    total: 0,
  },
};

export {getPicks, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION: {
      state['pick']['data'] = [];
      state['pick']['total'] = 0;
      state['allocated']['data'] = [];
      state['allocated']['total'] = 0;
      return {...state};
    }

    case ACTION_SUCCESS: {
      action['payload']['pick']['flag'] = state['pick']['flag'] + 1;
      action['payload']['allocated']['flag'] = state['allocated']['flag'] + 1;
      return {...state, ...action['payload'], flag: state.flag + 1};
    }

    case ACTION_ERROR:
      return {...state, flag: state['flag'] + 1};

    default:
      return state;
  }
};
