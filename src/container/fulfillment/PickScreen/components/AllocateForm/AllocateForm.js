import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import r from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Text, Button, Divider} from '../../../../../components';

const PickForm = props => {
  const {item, index, total} = props;

  return (
    <View
      onPress={() => onPress(item['orderId'])}
      activeOpacity={0.9}
      style={[
        Styles.card,
        styles.container,
        !index ? {marginTop: Metrics.margin.large} : null,
        index + 1 == total ? {marginBottom: Metrics.margin.large} : null,
      ]}>
      <View style={styles.container_header}>
        <Text
          text={'#' + item['orderName']}
          size={Fonts['size']['android']['title']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appPrimaryColor}
        />
      </View>
      <Divider height={1.5} />
      {item['lines'].map((e, idx) => (
        <View
          key={'product' + idx}
          style={[
            styles.container_item,
            idx + 1 != item['lines'].length
              ? {
                  borderBottomWidth: 1.5,
                  borderBottomColor: Colors.appLightGrayColor,
                }
              : null,
          ]}>
          <View style={{flex: 1}}>
            <Text
              text={e['odooProductName']}
              size={Fonts['size']['android']['normal'] - 2}
              style={{flexShrink: 1}}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: 45,
              ...Styles.center,
              backgroundColor: '#fff2cc',
              borderRadius: Metrics.borderRadius.medium,
            }}>
            <Text
              text={e['quantity']}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
              color={Colors.appOrange}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default PickForm;
