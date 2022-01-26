import React, {createRef, useImperativeHandle, useRef, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import Header from '../../../../components/Header';
import {Text, Button, Input} from '../../../../../components';
import {messageWarning} from '../../../../../redux/app';

const Information = React.forwardRef((props, ref) => {
  const {data} = props;
  const dispatch = useDispatch();
  const scrollView = useRef(null);
  const inputs = [createRef(null)];
  const [items, setItems] = useState([
    {
      id: 0,
      long: '',
      width: '',
      height: '',
      weight: '',
      weightExchange: '',
      inputRef: inputs[0],
    },
  ]);
  const [Index, setIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    value: items,
  }));

  const onNew = () => {
    let count = items.filter(x => !x['weight']);
    inputs.push(createRef(null));

    if (count.length > 0)
      return dispatch(messageWarning(['Trọng lượng  không được để trống']));

    let temp = items.concat([
      {
        id: Index + 1,
        long: '',
        width: '',
        height: '',
        weight: '',
        weightExchange: '',
        inputRef: inputs[inputs.length - 1],
      },
    ]);

    setItems([...temp]);
    setIndex(Index + 1);

    scrollView.current.scrollToEnd();
  };

  const onUpdate = (index, key, value) => {
    items[index][key] = value;

    if (
      items[index]['long'] &&
      items[index]['width'] &&
      items[index]['height']
    ) {
      let dimVolume =
        parseFloat(items[index]['long']) *
        parseFloat(items[index]['width']) *
        parseFloat(items[index]['height']);
      let weightExchange = (dimVolume / 5000).toFixed(2);
      items[index]['inputRef'].current.setText(weightExchange);
      items[index]['weightExchange'] = weightExchange;
    }
    setItems([...items]);
  };

  const onDelete = item => {
    setItems([...items.filter(x => x['id'] != item)]);
  };

  return (
    <View style={Styles.container}>
      <Header
        text={'Cập nhật đơn hàng'}
        company={'sbp'}
        onBack={props.onBack}
      />
      <ScrollView ref={scrollView} contentContainerStyle={styles.container}>
        <Text
          text={'số bill'.toUpperCase()}
          style={styles.title}
          color={Colors.appColor}
          size={Fonts['size']['android']['message']}
          font={Fonts['style']['android']['medium']}
        />
        <View style={styles.card}>
          <Text
            text={`${data ? data['orderNumber'] : ''}`.toUpperCase()}
            size={Fonts['size']['android']['message']}
          />
        </View>
        <Text
          text={'thông tin kiện'.toUpperCase()}
          style={styles.title}
          color={Colors.appColor}
          size={Fonts['size']['android']['message']}
          font={Fonts['style']['android']['medium']}
        />
        <View>
          <FlatList
            data={items}
            renderItem={({item, index}) => (
              <View key={item['ref']} style={styles.card_item}>
                <View style={styles.header_item}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name={'inbox'}
                      size={Metrics.icon.normal}
                      color={Colors.appOrange}
                    />
                    <Text
                      text={`Kiện ${index + 1}`}
                      size={Fonts['size']['android']['message']}
                      font={Fonts['style']['android']['medium']}
                      style={{marginLeft: Metrics.margin.tiny}}
                    />
                  </View>
                  {item['id'] != 0 ? (
                    <TouchableOpacity onPress={() => onDelete(item['id'])}>
                      <IonIcon
                        name={'ios-trash'}
                        size={Metrics.icon.regular}
                        color={Colors.appLightGrayColor}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Text
                  text={'Kích thước D x R x C'}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Input
                    placeholder={'0'}
                    style={[styles.input, styles.input_3x]}
                    typeKeyboard={'number-pad'}
                    callback={value => onUpdate(index, 'long', value)}
                    defaultValue={item['long']}
                  />
                  <Input
                    placeholder={'0'}
                    style={[styles.input, styles.input_3x]}
                    typeKeyboard={'number-pad'}
                    callback={value => onUpdate(index, 'width', value)}
                    defaultValue={item['width']}
                  />
                  <Input
                    placeholder={'0'}
                    style={[styles.input, styles.input_3x]}
                    typeKeyboard={'number-pad'}
                    callback={value => onUpdate(index, 'height', value)}
                    defaultValue={item['height']}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '48%'}}>
                    <Text
                      text={'Trong lượng(Kg)'}
                      size={Fonts['size']['android']['message']}
                      font={Fonts['style']['android']['medium']}
                    />
                    <Input
                      placeholder={'0'}
                      style={[styles.input, styles.input_2x]}
                      typeKeyboard={'number-pad'}
                      defaultValue={item['orderWeight']}
                      callback={value => onUpdate(index, 'weight', value)}
                    />
                  </View>
                  <View style={{width: '48%'}}>
                    <Text
                      text={'TL Quy đổi (Kg)'}
                      size={Fonts['size']['android']['message']}
                      font={Fonts['style']['android']['medium']}
                    />
                    <Input
                      ref={item['inputRef']}
                      placeholder={'0'}
                      style={[styles.input, styles.input_2x]}
                      typeKeyboard={'number-pad'}
                      edit={false}
                      defaultValue={item['weightExchange']}
                      callback={value =>
                        onUpdate(index, 'weightExchange', value)
                      }
                    />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Button
          onPress={onNew}
          text={'+ Thêm kiện'}
          type={'submit'}
          width={Metrics.width - Metrics.margin.large * 2}
          style={{
            // marginHorizontal: Metrics.margin.large,
            marginVertical: Metrics.margin.large,
          }}
        />
      </ScrollView>
    </View>
  );
});

export default Information;
