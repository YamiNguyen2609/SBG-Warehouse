const ACTION_LOGIN = 'LOGIN_USER';

const loginUser = (
  username,
  password,
  notifyVehicle = false,
  notifyUser = false,
  isLogin = true,
) => ({
  type: ACTION_LOGIN,
  username,
  password,
  notifyVehicle,
  notifyUser,
  isLogin,
});

export {loginUser, ACTION_LOGIN};

const initState = {};

export default (state = initState, action) => {
  switch (action['type']) {
    case ACTION_LOGIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};
