import React, {useRef, useImperativeHandle, useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Styles, Metrics, Colors, Fonts} from '../../../../../assets/styles';
import {Button, Input, Text} from '../../../../../components';
import Header from '../../../../components/Header';
import {updatePassword} from '../../../../../redux/user/redux/updatePassword';

const Form = React.forwardRef((props, ref) => {
  const [secure, setSecure] = useState(true);
  const [value, setValue] = useState('');
  const [validate, setValidate] = useState(false);

  let {text, triggerValue, placeholder, company} = props;

  const [color, setColor] = useState(Colors.appLightGrayColor);

  const onFocus = () => setColor(Colors[`appColor_${company}`]);

  const onBlur = () => setColor(Colors.appLightGrayColor);

  useEffect(() => {
    props.callback(validate);
  }, [validate]);

  useImperativeHandle(ref, () => ({
    value,
  }));

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          text={text}
          style={[Styles.text, {marginRight: Metrics.margin.tiny}]}
          font={Fonts['style']['android']['medium']}
        />
        <Icon
          name={validate ? 'ios-checkmark-circle' : 'ios-close-circle'}
          color={validate ? Colors.appGreen : Colors.appRed}
          size={Metrics.icon.small}
        />
      </View>
      <View
        style={[Styles.input, styles.container_input, {borderColor: color}]}>
        <TextInput
          style={styles.input}
          secureTextEntry={secure}
          value={value}
          onChangeText={val => {
            let type = typeof triggerValue;

            let triggerVal = undefined;

            if (type == 'function') triggerVal = triggerValue();
            else triggerVal = triggerValue;

            setValue(val);
            setValidate(
              triggerValue != undefined ? val == triggerVal : val != '',
            );
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.appLightGrayColor}
        />
        <TouchableOpacity activeOpacity={1} onPress={() => setSecure(!secure)}>
          <Icon
            name={secure ? 'ios-eye-outline' : 'ios-eye-off-outline'}
            color={Colors.overlay5}
            size={Metrics.icon.normal}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const Render = props => {
  const old_pass = useRef(null);
  const new_pass = useRef(null);
  const repeat_pass = useRef(null);
  const [status, setStatus] = useState(false);
  const {company, employee, flag} = props;
  const dispatch = useDispatch();

  useEffect(() => props.navigation.goBack, [flag.flagSuccess]);

  const onPress = () =>
    dispatch(
      updatePassword({
        type: 0,
        oldPassword: employee['password'],
        newPassword: new_pass.current.value,
      }),
    );

  const onValidate = status => {
    // console.log(
    //   'status',
    //   status &&
    //     old_pass.current.value == employee['password'] &&
    //     new_pass.current.value == repeat_pass.current.value,
    // );
    setStatus(
      old_pass.current.value == employee['password'] &&
        new_pass.current.value == repeat_pass.current.value,
    );
  };

  return (
    <View style={Styles.container}>
      <Header company={company} text={'Đổi mật khẩu'} />
      <View style={{flex: 1}}>
        <Form
          company={company}
          text={'Mật khẩu cũ'}
          placeholder={'Nhập mật khẩu cũ'}
          ref={old_pass}
          triggerValue={employee['password']}
          callback={onValidate}
        />
        <Form
          company={company}
          text={'Mật khẩu mới'}
          placeholder={'Nhập mật khẩu mới'}
          ref={new_pass}
          callback={onValidate}
        />
        <Form
          company={company}
          text={'Xác nhận mật khẩu mới'}
          placeholder={'Nhập lại mật khẩu mới'}
          ref={repeat_pass}
          triggerValue={() => {
            return new_pass.current ? new_pass.current.value : '';
          }}
          callback={onValidate}
        />
      </View>
      <View style={styles.container_button}>
        <Button
          text={'Trở về'}
          backgroundColor={Colors.appWhite}
          color={Colors[`appColor_${company}`]}
          border={2}
          width={'47%'}
          borderColor={Colors[`appColor_${company}`]}
          onPress={props.navigation.goBack}
        />
        <Button
          disabled={!status}
          onPress={onPress}
          text={'Đổi mật khẩu'}
          width={'47%'}
          backgroundColor={
            status
              ? Colors[`appColor_${company}`]
              : Colors[`appColor_disable_${company}`]
          }
        />
      </View>
    </View>
  );
};

export default Render;
