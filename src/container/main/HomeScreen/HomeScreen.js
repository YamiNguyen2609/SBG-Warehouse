import React from 'react';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';

const HomeScreen = props => {
  r.log('user', props['employee']['user']);

  return props['employee']['user'] ? <Render {...props} /> : null;
};

const mapStateToProps = state => ({
  employee: state.employee,
});

export default connect(mapStateToProps, null)(HomeScreen);
