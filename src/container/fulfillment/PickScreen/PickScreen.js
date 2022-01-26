import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getPicks} from '../../../redux/fulfillment/redux/getPicks';
import {getLots} from '../../../redux/fulfillment/redux/getLots';

const PickScreen = props => {
  const dispatch = useDispatch();
  const render = useRef(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      dispatch(getPicks(-1));
      setLoad(false);

      setTimeout(() => {
        if (render.current) render.current.reset();
      }, 250);
    }
  });

  return (
    <Render {...props} ref={render} onRefresh={() => dispatch(getPicks(-1))} />
  );
};

const mapStateToProps = state => ({
  pick: state.getPicks.pick,
  flagPick: state.getPicks.flag,
  allocated: state.getPicks.allocated,
  flag: state.pickOrder.flag,
  line_pick: state.pickOrder.data,
  locations: state.getProductsPick.data,
  lines: state.getProductsPick.lines,
  zones: state.getProductsPick.zones,
  items: state.getProductsPick.defaultData,
  flag_product_pick: state.getProductsPick.flag,
});

export default connect(mapStateToProps, null)(PickScreen);
