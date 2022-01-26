import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  Switch,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import Header from '../../../../components/Header';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Button, Divider, Input, Text} from '../../../../../components';
import DatePicker from '../../../../components/DatePicker';
import Camera from '../../../../components/Camera';
import InputSearch from '../../../../components/InputSearch';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {getLot} from '../../../../../redux/fulfillment/redux/getLot';
import {putOrder} from '../../../../../redux/fulfillment/redux/putOrder';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let flagLocation = 0;
let flagPut = 0;

const PutConfirm = props => {
  const dispatch = useDispatch();
  const input = useRef(null);
  const inputSearch = useRef(null);
  const [date, setDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [lot, setLot] = useState(props['location']);
  const {data, locations} = props;

  useEffect(() => {
    if (props['flag_location'] != flagLocation) {
      flagLocation = props['flag_location'];

      if (props['location']) {
        setLot({
          id: props['location']['locationId'],
          value: props['location']['locationName'],
        });
        onPressCamera(0);
      } else
        showMessage({
          type: 'warning',
          message: 'Scan mã kho',
          description: `${props['location']['locationName']} không tồn tại`,
        });
    }
  }, [props['flag_location']]);

  useEffect(() => {
    setLot({
      id: '',
      value: '',
    });
    setDate(null);
    if (data.line_id != 0 && inputSearch.current) {
      inputSearch.current.focus();
    }
  }, [data]);

  useEffect(() => {
    if (props['flag_put'] != flagPut) {
      flagPut = props['flag_put'];
      props.onClose();
    }
  }, [props['flag_put']]);

  const onBarCodeRead = (data, state) => {
    //1: camera, 2: input
    if (isCamera) {
      if (state == 1) {
        dispatch(
          showFlagMessage({
            item: [`Đã tìm thấy ${data}`],
            buttons: [
              {
                text: 'Quay lại',
                onPress: () => dispatch(hideFlagMessage()),
              },
              {
                text: 'Tiếp tục',
                onPress: () => {
                  dispatch(hideFlagMessage());
                  setTimeout(() => dispatch(getLot(data)), 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) dispatch(getLot(data));
      }
    }
  };

  const onPressCamera = index => {
    setIsCamera(index ? true : false);
    Animated.spring(formAnimation, {
      toValue: {x: -Metrics.width * index, y: 0},
      speed: 100,
      useNativeDriver: false,
    }).start();
  };

  const onPressConfirm = () => {
    let location = 0;
    if (isScrap) {
      let temp = locations.find(x => x.isScrap == true);
      if (temp) location = temp.id;
      else
        showMessage({
          type: 'warning',
          message: 'Put đơn hàng',
          description: 'Không tìm thấy scrap location',
        });
    } else if (lot.id == 0)
      return showMessage({
        type: 'warning',
        message: 'Put đơn hàng',
        description: 'Không tìm thấy location',
      });
    else location = lot.id;

    if (parseFloat(input.current.value) > data['actual_quantity'] && !isScrap)
      return showMessage({
        type: 'warning',
        message: 'Put đơn hàng',
        description: 'Số lượng PUT vượt quá số lượng còn lại',
      });

    let params = {
      locationId: location,
      replenishLineId: data['line_id'],
      quantity: input.current.value,
      isScrap,
    };

    if (date) params['expiredDate'] = moment(date).format('YYYY-MM-DD');

    dispatch(putOrder(params));
  };

  return (
    <View style={Styles.container}>
      <Animated.View
        style={[
          Styles.container,
          {
            flexDirection: 'row',
            width: Metrics.width * 2,
            flex: 1,
          },
          formAnimation.getLayout(),
        ]}>
        <View style={[Styles.container, {backgroundColor: Colors.appWhite}]}>
          <Header
            onBack={props.onClose}
            text={'Xác nhận put hàng'}
            company={'logi'}
            right={
              <TouchableOpacity
                onPress={() => onPressCamera(1)}
                style={{marginRight: Metrics.margin.small}}>
                <IonIcon
                  name="ios-barcode-outline"
                  size={Metrics.icon.regular}
                  color={Colors.appWhite}
                />
              </TouchableOpacity>
            }
          />
          <View style={styles.header}>
            <View style={styles.text}>
              <Text
                text={data['product_name']}
                size={Fonts['size']['android']['action'] - 1}
                font={Fonts['style']['android']['medium']}
                align={'center'}
              />
            </View>
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={{paddingTop: Metrics.margin.huge}}>
            <Text
              text={'Số lượng cần put còn lại'}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
              align={'center'}
            />
            <View
              style={[
                Styles.input,
                styles.input,
                {backgroundColor: '#fff2cc', height: 55},
                Styles.center,
              ]}>
              <Text
                text={String(data['actual_quantity'])}
                size={Fonts['size']['android']['message']}
                font={Fonts['style']['android']['medium']}
                align={'center'}
                color={Colors.appOrange}
              />
            </View>
            <View
              style={[
                styles.input,
                {
                  alignItems: 'flex-start',
                  marginBottom: Metrics.margin.regular,
                },
              ]}>
              <Text
                text={data['placementGuide']}
                size={Fonts['size']['android']['message']}
                font={Fonts['style']['android']['medium']}
                align={'center'}
                color={Colors.appRed}
              />
            </View>
            {data['orderType'] == 'to_return' ? (
              <View style={styles.container_scrap}>
                <Text
                  text={'Scrap Location'}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                  align={'center'}
                />
                <Switch
                  trackColor={{
                    false: Colors.appLightGrayColor,
                    true: Colors.appPrimaryColor,
                  }}
                  thumbColor={isScrap ? Colors.appColor_logi : '#f4f3f4'}
                  onValueChange={() => setIsScrap(!isScrap)}
                  value={isScrap}
                />
              </View>
            ) : null}
            {!isScrap ? (
              <View>
                <Text
                  text={'Location'}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                  align={'center'}
                />
                <InputSearch
                  ref={inputSearch}
                  onPress={setLot}
                  itemSelect={lot}
                  data={locations.filter(x => x['isScrap'] == isScrap)}
                />
              </View>
            ) : null}
            <Divider
              height={Metrics.margin.large}
              color={Colors.appLightGrayColor}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: Metrics.margin.regular,
                paddingTop: Metrics.margin.large,
              }}>
              <View style={{flex: 1}}>
                <Text
                  text={'Nhập số lượng PUT'}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                />
                {data['actual_quantity'] > 0 ? (
                  <Input
                    ref={input}
                    textAlignHorizontal={'center'}
                    typeKeyboard={'numeric'}
                    defaultValue={String(data['actual_quantity'])}
                    style={styles.input_value}
                  />
                ) : (
                  <View style={styles.input_value} />
                )}
              </View>
              <Divider width={Metrics.margin.regular} color={Colors.appTrans} />
              <View style={{flex: 1}}>
                <Text
                  text={'Nhập ngày hết hạn'}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                />
                <TouchableOpacity
                  onPress={() => setVisible(true)}
                  style={styles.button_date}>
                  <Text
                    text={date ? moment(date).format('DD-MM-YYYY') : ''}
                    size={Fonts['size']['android']['message']}
                    font={Fonts['style']['android']['medium']}
                  />
                  {date ? (
                    <TouchableOpacity
                      hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}
                      onPress={() => setDate(null)}>
                      <IonIcon
                        name="ios-close-circle-outline"
                        size={Metrics.icon.normal}
                        color={Colors.appLightGrayColor}
                      />
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <DatePicker
            visible={visible}
            close={() => setVisible(false)}
            submit={setDate}
          />
          <View style={styles.container_button}>
            <Button
              text={'PUT đơn hàng'}
              type={'confirm'}
              onPress={onPressConfirm}
            />
          </View>
        </View>
        <Camera
          onBack={() => onPressCamera(0)}
          text={'Scan location'}
          onBarCodeRead={onBarCodeRead}
          searchForm={{
            active: true,
            activeArea: true,
            placeholder: 'Nhập location',
            onBarCodeRead,
          }}
          imageForm={{
            active: false,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default PutConfirm;
