import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getReceipts} from '../../../redux/fulfillment/redux/getReceipts';
import {getLots} from '../../../redux/fulfillment/redux/getLots';
import {length} from '../../../helpers/Constants';

const PutScreen = props => {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const [offset_receipt, set_offset_receipt] = useState(1);

  useEffect(() => {
    if (load) {
      setLoad(false);
      setTimeout(
        () => dispatch(getLots({warehouseId: props['employee']['warehouse']})),
        250,
      );
    }
  });

  useEffect(() => {
    if (props['receipt']['flag'] == 0)
      dispatch(
        getReceipts({
          state: 1,
          offset: 1,
          orderType: 'import_goods',
        }),
      );
  }, [props['receipt']['flag']]);

  const onLoadMore = () => {
    let offset = 1;
    if (props['receipt']['total'] > offset_receipt * length) {
      set_offset_receipt(offset_receipt + 1);
      offset = offset_receipt + 1;
    }
    if (offset != 0)
      dispatch(
        getReceipts({
          state: 1,
          orderType: 'import_goods',
          offset,
        }),
      );
  };

  return (
    <Render
      {...props}
      onLoadMore={onLoadMore}
      onRefresh={() =>
        dispatch(
          getReceipts({
            state: 1,
            orderType: 'import_goods',
            offset: 1,
          }),
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  flag: state.getReceipts.flag,
  employee: state.employee.user,
  receipt: state.getReceipts.receipt,
  flag_receipts: state.getReceipts.receipt,
  item_receipt: state.getReceipt.data,
  flag_receipt: state.getReceipt.flag,
  location: state.getLot.data,
  locations: state.getLots.data,
  flag_location: state.getLot.flag,
  flag_put: state.putOrder.flag,
});

export default connect(mapStateToProps, null)(PutScreen);
