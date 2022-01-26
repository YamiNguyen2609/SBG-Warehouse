import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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

const Fulfillment = props => {
  const dispatch = useDispatch();

  return (
    <View style={[Styles.container, Styles.center]}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: Metrics.margin.small * 2,
        }}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('ReceptionScreen'))}>
          <FastImage source={Images.logi.icReception} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Receipt'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('PutScreen'))}>
          <FastImage source={Images.logi.icPut} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Put'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('PickScreen'))}>
          <FastImage source={Images.logi.icPick} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Pick'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('ExportScreen'))}>
          <FastImage source={Images.logi.icExport} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Export'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('DeliveryFailScreen'))}>
          <FastImage source={Images.logi.icReception} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Fail delivery'.toUpperCase()}
              align={'center'}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('ReturnScreen'))}>
          <FastImage source={Images.logi.icReception} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'return vendor'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPress={() => dispatch(replaceScreen('TransferFulfillmentScreen'))}>
          <FastImage source={Images.logi.icTransfer} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Transfer'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} activeOpacity={1}>
          <FastImage source={Images.logi.icInventory} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'inventory'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} activeOpacity={1}>
          <FastImage source={Images.logi.icCheck} style={styles.icon} />
          <View style={styles.title}>
            <Text
              text={'Check'.toUpperCase()}
              size={Fonts['size']['android']['message'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Fulfillment;
