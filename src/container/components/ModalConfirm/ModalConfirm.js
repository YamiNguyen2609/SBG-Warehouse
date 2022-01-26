import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics, Images} from '../../../assets/styles';
import {Button, Text} from '../../../components';

const ReceiptConfirm = props => {
  const {visible, body = <View />, onClose, onSubmit} = props;
  return (
    <Modal style={Styles.modal} isVisible={visible}>
      <View style={styles.container}>
        <View style={styles.container_icon}>
          <FastImage source={Images.logi.icConfirm} style={styles.icon} />
        </View>
        {body()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Colors.appWhite,
            width: '100%',
            paddingHorizontal: Metrics.margin.large,
            paddingBottom: Metrics.margin.huge,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.button,
              {
                backgroundColor: Colors.appGrayColor,
              },
            ]}
            onPress={onClose}>
            <Text
              text={'Huỷ'}
              font={Fonts['style']['android']['medium']}
              color={Colors.appWhite}
              style={Styles.button}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.button,
              {
                backgroundColor: Colors.appPrimaryColor,
              },
            ]}
            onPress={onSubmit}>
            <Text
              text={'Xác nhận'}
              font={Fonts['style']['android']['medium']}
              color={Colors.appWhite}
              style={Styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptConfirm;
