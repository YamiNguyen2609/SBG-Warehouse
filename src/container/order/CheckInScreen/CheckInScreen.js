import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';
import {getStations} from '../../../redux/order/redux/getStations';

const CheckInScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props['flagStation']) dispatch(getStations());
  });

  return <Render {...props} {...props.route.params} />;
};

const mapStateToProps = state => ({
  flag: state.checkIn.flag,
  flagFinish: state.finishCheckIn.flag,
  data: state.getStations.data,
  flagStation: state.getStations.flag,
  dataCheckIn: state.getCheckIns.data,
});

export default connect(mapStateToProps, null)(CheckInScreen);
