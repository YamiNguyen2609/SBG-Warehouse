import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import Render from './components/Render';

const ExportScreen = props => {
  return <Render {...props} {...props.route.params} />;
};

const mapStateToProps = state => ({
  data: state.getOrderExport.data,
  flag: state.getOrderExport.flag,
  flagExport: state.exportOrder.flag,
});

export default connect(mapStateToProps, null)(ExportScreen);
