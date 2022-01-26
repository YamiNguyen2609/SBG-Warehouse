import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {reportOrders} from '../../../redux/order/redux/reportOrder';

const ReportScreen = props => {
  const [flag, setFlag] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (flag != props['flag']) dispatch(reportOrders());
  });
  return <Render {...props} />;
};

const mapStateToProps = state => ({
  data: state.reportOrder.data,
  flag: state.employee.flag,
});

export default connect(mapStateToProps, null)(ReportScreen);
