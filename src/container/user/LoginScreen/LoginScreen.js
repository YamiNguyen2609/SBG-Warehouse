import React, {Component, useEffect} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';

const LoginScreen = props => {
  useEffect(() => {
    if (props['user'])
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
  }, [props['user']]);

  return <Render />;
};

const mapStateToProps = state => ({
  user: state.employee.user,
});

export default connect(mapStateToProps, null)(LoginScreen);
