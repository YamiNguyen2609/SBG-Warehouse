import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Header from '../Header';
import {Text, Input, Divider} from '../../../components';
import {Styles, Fonts, Colors, Metrics} from '../../../assets/styles';
import {store} from '../../../redux/ConfigureStore';

const ModalLocation = props => {
  const input = useRef(null);
  const [value, setValue] = useState('');
  const {data = [], visible = true} = props;

  const onChange = value => {
    console.log('vo ne', value);
    setValue(value);
    input.current.setText(value);
  };

  useEffect(() => {
    if (visible)
      setTimeout(() => {
        setValue('');
        input.current.focus();
      }, 250);
  }, [visible]);

  let items = data.filter(x => {
    if (value != '') {
      return (
        String(x['value']).toUpperCase().indexOf(String(value).toUpperCase()) >
        -1
      );
    }
  });

  if (items.length == 1) {
    props['onPress'](items[0]);
    setValue('');
  }

  return (
    <Modal
      isVisible={visible}
      style={[Styles.modal, {justifyContent: 'flex-end'}]}>
      <View style={[Styles.container, styles.container]}>
        <Header
          text={'Danh sách location'}
          company={'logi'}
          right={
            <TouchableOpacity
              onPress={props.onClose}
              style={{marginRight: Metrics.margin.small}}>
              <IonIcon
                name="ios-close"
                size={Metrics.icon.regular}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          }
        />
        <View
          style={{
            padding: Metrics.margin.tiny,
            elevation: 20,
            backgroundColor: Colors.appWhite,
          }}>
          <Input
            ref={input}
            placeholder={'Nhập location'}
            width={Metrics.width - Metrics.margin.small * 5}
            style={{borderColor: Colors.appLightGrayColor}}
            callback={onChange}
            showSoftInputOnFocus={!store.getState()['app']['deviceState']}
          />
        </View>
        <FlatList
          data={items}
          ItemSeparatorComponent={() => <Divider height={1.5} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => props['onPress'](item)}
              style={styles.item}>
              <Text
                text={item['value']}
                size={Fonts['size']['android']['action'] - 1}
                font={Fonts['style']['android']['medium']}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default ModalLocation;
