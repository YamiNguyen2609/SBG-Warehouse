import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';

const ScanScreen = props => {
  return <Render {...props} {...props.route.params} />;
};

const mapStateToProps = state => ({
  flag: state.dispatchOrder.flag,
});

export default connect(mapStateToProps, null)(ScanScreen);
