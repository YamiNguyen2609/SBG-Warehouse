import React, {useEffect, useState, useImperativeHandle} from 'react';
import {TouchableOpacity, View} from 'react-native';
import r from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Text, Button} from '../../../../../components';

const PickForm = React.forwardRef((props, ref) => {
  let {item, index, total} = props;
  const [state, setState] = useState(false);

  useImperativeHandle(ref, () => ({
    value: item,
    setState: setState,
  }));

  const onPress = () => {
    setState(!state);
  };

  useEffect(() => {
    if (item['selected'] != state) {
      item['selected'] = state;
    }
  }, [state]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        Styles.card,
        styles.container,
        !index ? {marginTop: Metrics.margin.large} : null,
        index + 1 == total ? {marginBottom: Metrics.margin.large} : null,
      ]}>
      <View style={{flex: 1}}>
        <Text
          text={
            String(item['orderRef']) != 'false' ? '#' + item['orderRef'] : ''
          }
          size={Fonts['size']['android']['title']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appPrimaryColor}
        />
        <Text
          text={'#' + item['orderName']}
          size={Fonts['size']['android']['action'] - 2}
          font={Fonts['style']['android']['italic']}
          color={Colors.overlay7}
        />
      </View>
      <View
        style={[
          styles.circle,
          state
            ? {backgroundColor: Colors.appPrimaryColor}
            : {
                borderWidth: 1.5,
                borderColor: Colors.appLightGrayColor,
              },
        ]}>
        <Icon
          name={'ios-checkmark'}
          size={Metrics.icon.small - 2}
          color={Colors.appWhite}
        />
      </View>
    </TouchableOpacity>
  );
});

export default PickForm;
