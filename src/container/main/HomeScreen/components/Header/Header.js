import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Styles,
} from '../../../../../assets/styles';
import {Text} from '../../../../../components';

const Header = props => {
  const {isFulfillment, employee} = props;
  return (
    <View style={styles.container}>
      <FastImage
        source={isFulfillment ? Images.icLogoLogi : Images.logoApp}
        style={[
          styles.logo,
          {
            marginLeft: isFulfillment
              ? Metrics.margin.regular
              : Metrics.margin.small,
          },
        ]}
      />
      <View
        style={{
          width: Metrics.width - Metrics.margin.regular * 2,
          // height: Metrics.height / 6,
          backgroundColor: isFulfillment
            ? Colors.appColor_logi
            : Colors.appColor_sbp,
          borderRadius: Metrics.borderRadius.large,
          marginHorizontal: Metrics.margin.regular,
          padding: Metrics.margin.large,
          justifyContent: 'flex-end',
        }}>
        <Text
          text={`Hi ${employee['full_name']}`}
          size={Fonts['size']['android']['message']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appWhite}
          style={{marginBottom: Metrics.margin.tiny}}
        />
        <Text
          text={`Welcome to ${
            isFulfillment ? 'Fulfillment' : 'TMS'
          } Management`}
          size={Fonts['size']['android']['message']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appWhite}
        />
      </View>
    </View>
  );
};

export default Header;
