import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getReceipts} from '../../../redux/fulfillment/redux/getReceipts';
import {length} from '../../../helpers/Constants';

const ReceptionScreen = props => {
  const dispatch = useDispatch();
  const render = useRef(null);
  const [load, setLoad] = useState(true);
  const [offset_in_receipt, set_offset_in_receipt] = useState(1);
  const [offset_receipt, set_offset_receipt] = useState(1);

  useEffect(() => {
    if (load) {
      setLoad(false);

      setTimeout(() => {
        dispatch(
          getReceipts({
            state: -1,
            orderType: 'import_goods',
            offset: 1,
          }),
        );
        if (render.current) render.current.reset();
      }, 250);
    }
  });

  const onLoadMore = state => {
    let offset = 0;
    if (state == 0) {
      if (props['in_receipt']['total'] > offset_in_receipt * length) {
        set_offset_in_receipt(offset_in_receipt + 1);
        offset = offset_in_receipt + 1;
      }
    } else {
      if (props['receipt']['total'] > offset_receipt * length) {
        set_offset_receipt(offset_receipt + 1);
        offset = offset_receipt + 1;
      }
    }
    if (offset != 0)
      dispatch(
        getReceipts({
          state,
          orderType: 'import_goods',
          offset,
        }),
      );
  };

  return (
    <Render
      {...props}
      ref={render}
      onLoadMore={onLoadMore}
      onRefresh={() =>
        dispatch(
          getReceipts({
            state: -1,
            orderType: 'import_goods',
            offset: 1,
          }),
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  flag_list: state.getReceipts.flag,
  in_receipt: state.getReceipts.inReceipt,
  receipt: state.getReceipts.receipt,
  item_receipt: state.getReceipt.data,
  flag_receipt: state.getReceipt.flag,
  flag: state.receiptOrder.flag,
});

export default connect(mapStateToProps, null)(ReceptionScreen);
