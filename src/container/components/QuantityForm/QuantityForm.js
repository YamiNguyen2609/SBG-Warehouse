import React, {useImperativeHandle, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import styles from './styles';
import {Styles, Colors, Fonts, Metrics} from '../../../assets/styles';
import {Text, Input} from '../../../components';

const QuantityForm = React.forwardRef((props, ref) => {
  const {data, title1, title2, title3, isDefault = true} = props;
  const input = useRef(null);
  const flashMessage = useRef(null);

  useImperativeHandle(ref, () => ({
    getText: () => input.current.value,
    showMessage: data => flashMessage.current.showMessage(data),
  }));

  return (
    <View style={styles.container}>
      <Text
        text={data['product_name']}
        size={Fonts['size']['android']['message']}
        font={Fonts['style']['android']['medium']}
        align={'center'}
        color={Colors.appColor_logi}
        style={{marginBottom: Metrics.margin.regular}}
      />
      <Text
        text={title1}
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
          text={String(
            data['quantity'] ? data['quantity'] : data['actual_quantity'],
          )}
          size={Fonts['size']['android']['message']}
          font={Fonts['style']['android']['medium']}
          align={'center'}
          color={Colors.appOrange}
        />
      </View>
      {title3 ? (
        <View style={{width: '100%'}}>
          <Text
            text={title3}
            size={Fonts['size']['android']['message']}
            font={Fonts['style']['android']['medium']}
            align={'center'}
          />
          <View
            style={[
              Styles.input,
              styles.input,
              {
                backgroundColor: Colors.appPrimaryColor,
                height: 55,
                marginHorizontal: 0,
              },
              Styles.center,
            ]}>
            <Text
              text={String(data['stock'])}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
              align={'center'}
              color={Colors.appWhite}
            />
          </View>
        </View>
      ) : null}

      <Text
        text={title2}
        size={Fonts['size']['android']['message']}
        font={Fonts['style']['android']['medium']}
        align={'center'}
      />
      <Input
        ref={input}
        textAlignHorizontal={'center'}
        typeKeyboard={'numeric'}
        defaultValue={String(isDefault ? data['actual_quantity'] : '')}
        style={[styles.input, {backgroundColor: '#d2edf8'}]}
      />
      <FlashMessage
        ref={flashMessage}
        position="top"
        style={{paddingTop: 20, zIndex: 1000}}
      />
    </View>
  );
});

export default QuantityForm;
