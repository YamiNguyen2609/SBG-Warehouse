const ACTION = 'GET_ORDERS';
const ACTION_INCOMPLETE_SUCCESS = ACTION + '_INCOMPLETE_SUCCESS';
const ACTION_COMPLETE_SUCCESS = ACTION + '_COMPLETE_SUCCESS';
const ACTION_DISMISS_SUCCESS = ACTION + '_DISMISS_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getOrders = data => ({
  type: ACTION,
  data,
});

const onSuccessIncomplete = payload => ({
  type: ACTION_INCOMPLETE_SUCCESS,
  payload,
});

const onSuccessComplete = payload => ({
  type: ACTION_COMPLETE_SUCCESS,
  payload,
});

const onSuccessDismiss = payload => ({
  type: ACTION_DISMISS_SUCCESS,
  payload,
});

const onFailure = payload => ({
  type: ACTION_ERROR,
  payload,
});

const initialState = {
  incomplete: {
    flag: 0,
    data: {
      delivery: {data: [], total: 0},
      pickup: {data: [], total: 0},
    },
  },
  complete: {
    flag: 0,
    data: {
      delivery: {data: [], total: 0},
      pickup: {data: [], total: 0},
    },
  },
  dismiss: {
    flag: 0,
    data: {
      delivery: {data: [], total: 0},
      pickup: {data: [], total: 0},
    },
  },
};

export {
  onFailure,
  onSuccessComplete,
  onSuccessDismiss,
  onSuccessIncomplete,
  getOrders,
  ACTION,
};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};

    case ACTION_INCOMPLETE_SUCCESS: {
      const {refreshing, data} = action['payload'];
      if (refreshing) {
        state['incomplete']['data']['delivery']['data'] = [];
        state['incomplete']['data']['delivery']['total'] = 0;
        state['incomplete']['data']['pickup']['data'] = [];
        state['incomplete']['data']['pickup']['total'] = 0;
      }
      if (data['delivery'])
        state['incomplete']['data']['delivery'] = data['delivery'];
      if (data['pickup'])
        state['incomplete']['data']['pickup'] = data['pickup'];
      state['incomplete']['flag'] += 1;
      return {
        ...state,
      };
    }

    case ACTION_COMPLETE_SUCCESS: {
      const {refreshing, data} = action['payload'];
      if (refreshing) {
        state['complete']['data']['delivery']['data'] = [];
        state['complete']['data']['delivery']['total'] = 0;
        state['complete']['data']['pickup']['data'] = [];
        state['complete']['data']['pickup']['total'] = 0;
      }
      if (data['delivery'])
        state['complete']['data']['delivery'] = data['delivery'];
      if (data['pickup']) state['complete']['data']['pickup'] = data['pickup'];
      state['complete']['flag'] += 1;
      return {
        ...state,
      };
    }

    case ACTION_DISMISS_SUCCESS: {
      const {refreshing, data} = action['payload'];
      if (refreshing) {
        state['dismiss']['data']['delivery']['data'] = [];
        state['dismiss']['data']['delivery']['total'] = 0;
        state['dismiss']['data']['pickup']['data'] = [];
        state['dismiss']['data']['pickup']['total'] = 0;
      }
      if (data['delivery'])
        state['dismiss']['data']['delivery'] = data['delivery'];
      if (data['pickup']) state['dismiss']['data']['pickup'] = data['pickup'];
      state['dismiss']['flag'] += 1;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
