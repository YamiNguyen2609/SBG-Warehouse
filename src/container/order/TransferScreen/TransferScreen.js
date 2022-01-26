import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';

const TransferScreen = props => {
  return <Render {...props} {...props.route.params} />;
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(TransferScreen);
