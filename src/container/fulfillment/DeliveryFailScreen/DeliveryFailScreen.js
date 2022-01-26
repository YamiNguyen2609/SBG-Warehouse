import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';
import {getReasons} from '../../../redux/order/redux/getReasons';

const DeliveryFailScreen = props => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  if (load) {
    setLoad(false);
    dispatch(getReasons());
  }

  return <Render {...props} {...props.route.params} />;
};

const mapStateToProps = state => ({
  flag: state.returnOrder.flag,
  reasons: state.getReasons.data,
});

export default connect(mapStateToProps, null)(DeliveryFailScreen);
