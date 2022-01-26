import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';

const SettingScreen = props => {
  return props['employee']['user'] ? <Render {...props} /> : null;
};

const mapStateToProps = state => ({
  employee: state.employee,
  company: state.app.company,
  isEnable: state.app.deviceState,
});

export default connect(mapStateToProps, null)(SettingScreen);
