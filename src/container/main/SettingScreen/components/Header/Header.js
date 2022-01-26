import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Styles,
} from '../../../../../assets/styles';
import {Divider, Text} from '../../../../../components';

import {replaceScreen} from '../../../../../redux/navigation';

const Header = props => {
  const dispatch = useDispatch();
  const {company, employee} = props;

  const {user, vehicle} = employee;

  let spl = user['full_name'].split(' ');

  const full_name = `${spl[0]} ${spl[spl.length - 1]}`;

  return (
    <FastImage style={styles.container} source={Images[company]['background']}>
      <TouchableOpacity
        onPress={() => dispatch(replaceScreen('UserScreen'))}
        activeOpacity={1}
        style={styles.container_info}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.container_avatar}>
            <FastImage source={Images.icAvatarNone} style={{flex: 1}} />
          </View>
          <View style={styles.container_employee}>
            <Text
              text={full_name}
              size={Fonts['size']['android']['input'] + 2}
              color={Colors.appWhite}
            />
            <Text
              text={'Thông tin hồ sơ'}
              size={Fonts['size']['android']['normal']}
              color={Colors.appWhite}
            />
          </View>
        </View>
      </TouchableOpacity>
    </FastImage>
  );
};

export default Header;
