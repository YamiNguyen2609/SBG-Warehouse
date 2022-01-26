import React, {useEffect, useState} from 'react';
import {View, ViewStyle} from 'react-native';

import {Styles, Colors, Metrics, Fonts} from '../assets/styles';
import Text from './Text';

const AppMessage = props => {
  const [Flag, setFlag] = useState(0);
  const [visible, setVisible] = useState(false);

  const {title = '', body = '', flag = 0, time = 5, style = {}} = props;

  useEffect(() => {
    if (flag != Flag) {
      setFlag(flag);
      setVisible(true);
      setTimeout(() => setVisible(false), time * 1000);
    }
  }, [flag]);

  return visible ? (
    <View
      style={{
        ...Styles.center,
        position: 'absolute',
        zIndex: 999,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View
        style={[
          {
            ...Styles.center,
            backgroundColor: Colors.overlay5,
            marginHorizontal: Metrics.margin.huge,
            borderRadius: Metrics.borderRadius.medium,
            padding: Metrics.margin.huge,
          },
          style,
        ]}>
        {title ? (
          <Text
            text={title}
            style={[Styles.title, {marginBottom: Metrics.margin.small}]}
          />
        ) : null}
        {body ? (
          <Text
            text={body}
            color={Colors.appWhite}
            style={Styles.text}
            align={'center'}
          />
        ) : null}
      </View>
    </View>
  ) : null;
};

export default AppMessage;
