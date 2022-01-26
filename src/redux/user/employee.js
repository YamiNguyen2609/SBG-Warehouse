const ACTION_EMPLOYEE = 'ACTION_EMPLOYEE';
const ACTION_VEHICLE = 'ACTION_VEHICLE';
const ACTION_PASSWORD = 'ACTION_PASSWORD';
const ACTION_INCIDENTS = 'ACTION_INCIDENTS';

const setEmployee = payload => ({
  type: ACTION_EMPLOYEE,
  payload,
});

const setVehicle = payload => ({
  type: ACTION_VEHICLE,
  payload,
});

const setPassword = payload => ({
  type: ACTION_PASSWORD,
  payload,
});

const setIncidents = payload => ({
  type: ACTION_INCIDENTS,
  payload,
});

const initState = {
  user: undefined,
  vehicle: undefined,
  incidents: [],
  flag: 0,
};

export {setEmployee, setVehicle, setPassword, setIncidents};

export default (state = initState, action) => {
  switch (action['type']) {
    case ACTION_EMPLOYEE:
      state['user'] = action['payload'];
      state['flag'] += 1;
      return {
        ...state,
      };
    case ACTION_VEHICLE:
      state['vehicle'] = action['payload'];
      return {
        ...state,
      };
    case ACTION_PASSWORD:
      state['user']['password'] = action['payload'];
      return {
        ...state,
      };
    case ACTION_INCIDENTS:
      let data = {};
      action['payload'].forEach(e => {
        data[e['code']] = {
          id: e.id,
          name: e.name,
        };
      });

      state['incidents'] = data;
      return {
        ...state,
      };

    default:
      return state;
  }
};
