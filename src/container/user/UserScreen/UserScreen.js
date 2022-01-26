import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';

const UserScreen = props => {
  return <Render {...props} />;
};

const mapStateToProps = state => ({
  employee: state.employee.user,
  company: state.app.company,
});

export default connect(mapStateToProps, null)(UserScreen);
