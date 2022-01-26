import React, {useEffect, useState} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaView} from 'react-navigation';
import r from 'reactotron-react-native';

// import RootNavigation from '../navigation/RootNavigation';
import {Styles, Fonts, Colors} from '../assets/styles';
import {Message, Indicator, Text, Alert} from '../components';
import {showFlagMessage, hideFlagMessage} from '../redux/app';
import RootNavigation from './navigation/RootNavigation';

const TextMessageView = data => {
  return data ? (
    <View>
      {data.map((el, index) => (
        <Text
          text={el}
          key={index}
          align="center"
          size={Fonts['size']['android']['action']}
        />
      ))}
    </View>
  ) : null;
};

class RootContainer extends React.Component {
  state = {
    flagIndicator: false,
    flagMessage: 0,
    flagTextMessage: 0,
    flagWarning: 0,
  };

  UNSAFE_componentWillReceiveProps = nextProp => {
    if (this.props.flagIndicator != nextProp.flagIndicator) {
      this.setState({flagIndicator: nextProp.flagIndicator});
    }
    if (this.props.flagMessage.flag != nextProp.flagMessage.flag) {
      this.setState({flagMessage: nextProp.flagMessage.flag});
    }
    if (this.state.flagTextMessage != nextProp.textMessage.flag) {
      this.setState({flagTextMessage: nextProp.textMessage.flag});
    }
    if (this.state.flagWarning != nextProp.flagWarning.flag) {
      this.setState({flagWarning: nextProp.flagWarning.flag}, () => {
        if (nextProp['flagWarning']['message'])
          this.props.showFlagMessage({
            item: nextProp.flagWarning.message,
          });
      });
    }
  };

  render() {
    return (
      <View style={[{backgroundColor: 'transparent'}, Styles.container]}>
        <SafeAreaView style={{backgroundColor: 'transparent'}} />
        <RootNavigation />
        <FlashMessage position="top" style={{paddingTop: 20}} />
        <Message
          flag={this.state.flagTextMessage}
          body={this.props.textMessage.message}
          time={this.props.textMessage.time}
        />
        <Indicator
          visible={this.state.flagIndicator}
          Colors={Colors.appPrimaryColor}
        />
        <Alert
          visible={this.state.flagMessage}
          title={this.props.flagMessage.title}
          align={'center'}
          body={() => TextMessageView(this.props.flagMessage.item)}
          buttons={this.props.flagMessage.buttons}
          callBack={() => {
            this.props.hideFlagMessage();
          }}
        />
      </View>
    );
  }
}

const mapStateToProp = state => ({
  flagIndicator: state.app.flagIndicator,
  textMessage: state.app.textMessage,
  flagMessage: state.app.flagMessage,
  flagWarning: state.app.messageWarning,
});

const mapDispatchToProp = {
  showFlagMessage,
  hideFlagMessage,
};

export default connect(mapStateToProp, mapDispatchToProp)(RootContainer);
