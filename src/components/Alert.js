import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import r from 'reactotron-react-native';

import {Styles, Colors, Metrics, Fonts} from '../assets/styles';
import Text from './Text';
import Divider from './Divider';

const buttonWidth = Metrics.width - Metrics.margin.huge * 2;

const AppAlert = props => {
  let {
    visible = false,
    title = 'Thông báo',
    body = () => <View />,
    buttons = [
      {
        text: 'Đóng',
        onPress: props.callBack,
      },
    ],
  } = props;

  return visible && body() ? (
    <View
      style={{
        ...Styles.center,
        position: 'absolute',
        zIndex: 999,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.overlay1,
      }}>
      <View
        style={[
          {
            ...Styles.center,
            backgroundColor: Colors.appWhite,
            marginHorizontal: Metrics.margin.huge,
            borderRadius: Metrics.borderRadius.medium,
            paddingTop: Metrics.margin.huge,
            width: Metrics.width - Metrics.margin.huge * 2,
            overflow: 'hidden',
          },
        ]}>
        {title ? (
          <Text
            text={title}
            style={[Styles.text, {marginBottom: Metrics.margin.small}]}
            bold={true}
          />
        ) : null}
        {body()}
        <Divider style={{marginTop: Metrics.margin.large}} />
        <FlatList
          horizontal={true}
          data={buttons}
          renderItem={({item, idx}) => (
            <TouchableOpacity activeOpacity={1} onPress={item.onPress}>
              <Text
                text={item.text}
                align={'center'}
                style={[
                  Styles.text,
                  {
                    height: 50,
                    width: buttonWidth / buttons.length - 0.8,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Divider height={'100%'} width={0.8} />}
        />
      </View>
    </View>
  ) : null;
};

export default AppAlert;
