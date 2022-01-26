import moment from 'moment';
import r from 'reactotron-react-native';

const ACTION = 'LOG_USER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const logUser = data => ({
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
  total: 0,
  flag: 0,
};

export {ACTION, logUser, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      if (action['data']['refreshing']) state['data'] = [];
      return {
        ...state,
      };
    case ACTION_SUCCESS:
      const {payload} = action;
      let dateArr = [
        ...new Set(
          payload['data'].map(e => moment(e['taken_at']).format('MM/YYYY')),
        ),
      ];

      let data = state['data'];
      dateArr.forEach(e => {
        let items = payload['data'].filter(
          x => moment(x['taken_at']).format('MM/YYYY') == e,
        );
        let index = data.findIndex(c => c.month == e);
        if (index == -1) items[0]['month'] = e;

        data = data.concat(items);
      });

      state['data'] = data;
      state['total'] = payload['total'];
      state['flag'] += 1;
      return {
        ...state,
      };
    case ACTION_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};
