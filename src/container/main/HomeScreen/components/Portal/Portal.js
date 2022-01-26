import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {
  Styles,
  Images,
  Metrics,
  Colors,
  Fonts,
} from '../../../../../assets/styles';
import {Text} from '../../../../../components';
import {replaceScreen} from '../../../../../redux/navigation';

const Portal = props => {
  const dispatch = useDispatch();
  const [size, setSize] = useState(0);

  return (
    <View
      style={[Styles.container, Styles.center]}
      onLayout={event => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setSize((height - Metrics.margin.regular * 2) / 4);
      }}>
      {size > 0 ? (
        <View style={Styles.container}>
          <View style={[styles.item_button, {height: size}]}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={1}
              onPress={() => dispatch(replaceScreen('CheckInScreen'))}>
              <FastImage source={Images.icCheckIn} style={styles.icon} />
              <Text
                text={'Scan checkin'.toUpperCase()}
                size={Fonts['size']['android']['message'] - 3}
                font={Fonts['style']['android']['medium']}
              />
            </TouchableOpacity>
            <View style={{width: Metrics.margin.regular * 1.5}} />
            <TouchableOpacity style={styles.card} activeOpacity={1}>
              <FastImage source={Images.icCollect} style={styles.icon} />
              <Text
                text={'Gom hàng'.toUpperCase()}
                size={Fonts['size']['android']['message'] - 3}
                font={Fonts['style']['android']['medium']}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.item_button, {height: size}]}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={1}
              onPress={() => dispatch(replaceScreen('RexScreen'))}>
              <FastImage source={Images.icRex} style={styles.icon} />
              <Text
                text={'Rex-Scan'.toUpperCase()}
                size={Fonts['size']['android']['message'] - 3}
                font={Fonts['style']['android']['medium']}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={1}
              onPress={() => dispatch(replaceScreen('TransferScreen'))}>
              <FastImage source={Images.sbp.icHandOver} style={styles.icon} />
              <Text
                text={'Chuyển giao nhận'.toUpperCase()}
                size={Fonts['size']['android']['message'] - 3}
                font={Fonts['style']['android']['medium']}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={Styles.container} />
      )}
    </View>
  );
};

export default Portal;
