import React from 'react';
import {ScrollView, View} from 'react-native';

import Portal from '../Portal';
import Fulfillment from '../Fulfillment';
import {Styles} from '../../../../../assets/styles';
import Header from '../Header';

const Render = props => {
  let isFulfillment = props['employee']['user']['warehouse'] != null;

  return (
    <View style={Styles.container}>
      <Header
        isFulfillment={isFulfillment}
        employee={props['employee']['user']}
      />
      {!isFulfillment ? <Portal {...props} /> : <Fulfillment {...props} />}
    </View>
  );
};

export default Render;
