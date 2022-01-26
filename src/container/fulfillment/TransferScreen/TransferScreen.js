import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getStocks} from '../../../redux/fulfillment/redux/getStocks';
import {getLots} from '../../../redux/fulfillment/redux/getLots';

const TransferScreen = props => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      setLoad(false);

      setTimeout(
        () => dispatch(getLots({warehouseId: props['employee']['warehouse']})),
        300,
      );
    }
  }, []);

  return <Render {...props} />;
};

const mapStateToProps = state => ({
  employee: state.employee.user,
  company: state.app.company,
  flag_stocks: state.getStocks.flag,
  stocks: state.getStocks.data,
  location: state.getLot.data,
  locations: state.getLots.data,
  flag_location: state.getLot.flag,
  flag_transfer: state.transferLocation.flag,
});

export default connect(mapStateToProps, null)(TransferScreen);
