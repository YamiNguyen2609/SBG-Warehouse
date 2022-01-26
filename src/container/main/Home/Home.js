import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {connect, useDispatch} from 'react-redux';

import {loginUser} from '../../../redux/user/redux/loginUser';
import TabNavigation from '../../navigation/TabNavigation';

const Home = props => {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props['user']) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  }, [props['user']]);

  useEffect(() => {
    if (load) {
      setLoad(false);
      const {username = '', password = ''} = props['user'];
      dispatch(loginUser(username, password, true, true));
      AppState.addEventListener('change', stateAction);
    }
  });

  const stateAction = state => {
    if (state == 'active') {
      const {username = '', password = ''} = props['user'];
      dispatch(loginUser(username, password, true, true, false));
    }
  };
  return <TabNavigation />;
};

const mapStateToProps = state => ({
  user: state.employee.user,
});

export default connect(mapStateToProps, null)(Home);
