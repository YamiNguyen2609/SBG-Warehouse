import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getReceipts} from '../../../redux/fulfillment/redux/getReceipts';

const ReturnScreen = props => {
  const dispatch = useDispatch();
  const render = useRef(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      setLoad(false);

      setTimeout(() => {
        dispatch(getReceipts(-1));
        if (render.current) render.current.reset();
      }, 250);
    }
  });

  return (
    <Render
      {...props}
      ref={render}
      onRefresh={() => dispatch(getReceipts(-1))}
    />
  );
};

const mapStateToProps = state => ({
  in_receipt: state.getReceipts.inReceipt,
  receipt: state.getReceipts.receipt,
  item_receipt: state.getReceipt.data,
  flag_receipt: state.getReceipt.flag,
  flag: state.receiptOrder.flag,
});

export default connect(mapStateToProps, null)(ReturnScreen);
