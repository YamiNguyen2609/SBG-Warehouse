import React, {useEffect, useState, useRef} from 'react';
import {Easing, Animated} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

//main
import LauncherScreen from '../main/LauncherScreen';
import LoginScreen from '../user/LoginScreen';
import Home from '../main/Home';

//user
import UserScreen from '../user/UserScreen';
import PasswordScreen from '../user/PasswordScreen';

//order
import ScanOrderScreen from '../order/ScanScreen';
import CheckInScreen from '../order/CheckInScreen';
import TransferScreen from '../order/TransferScreen';
import RexScreen from '../order/RexScreen';
import ExportScreen from '../order/ExportScreen';

//fulfillment
import ReceptionScreen from '../fulfillment/ReceptionScreen';
import ReturnScreen from '../fulfillment/ReturnScreen';
import TransferFulfillmentScreen from '../fulfillment/TransferScreen';
import PutScreen from '../fulfillment/PutScreen';
import PickScreen from '../fulfillment/PickScreen';
import DeliveryFailScreen from '../fulfillment/DeliveryFailScreen';

const screens = [
  {
    name: 'LauncherScreen',
    component: LauncherScreen,
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'UserScreen',
    component: UserScreen,
  },
  {
    name: 'PasswordScreen',
    component: PasswordScreen,
  },
  {
    name: 'ScanOrderScreen',
    component: ScanOrderScreen,
  },
  {
    name: 'CheckInScreen',
    component: CheckInScreen,
  },
  {
    name: 'TransferScreen',
    component: TransferScreen,
  },
  {
    name: 'RexScreen',
    component: RexScreen,
  },
  {
    name: 'ReceptionScreen',
    component: ReceptionScreen,
  },
  {
    name: 'TransferFulfillmentScreen',
    component: TransferFulfillmentScreen,
  },
  {
    name: 'PutScreen',
    component: PutScreen,
  },
  {
    name: 'PickScreen',
    component: PickScreen,
  },
  {
    name: 'ExportScreen',
    component: ExportScreen,
  },
  {
    name: 'ReturnScreen',
    component: ReturnScreen,
  },
  {
    name: 'DeliveryFailScreen',
    component: DeliveryFailScreen,
  },
];

const transitionSpec = {
  open: {
    animation: 'timing',
    config: {
      duration: 50,
      easing: Easing.out(Easing.poly(4)),
    },
  },
  close: {
    animation: 'timing',
    config: {
      duration: 50,
      easing: Easing.out(Easing.poly(4)),
    },
  },
};

const Stack = createNativeStackNavigator();

const navigator = createNavigationContainerRef();

export class RootNavigation extends React.Component {
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.stack != nextProps.stack) {
      const {screen, data} = nextProps;
      navigator.navigate(screen, data);
    }

    if (this.props.resetStack != nextProps.resetStack) {
      const {screen, data} = nextProps;
      navigator.reset({
        index: 0,
        routes: [{name: screen, data}],
      });
    }

    if (this.props.removeStack != nextProps.removeStack) {
      const {screen, data, index} = nextProps;
      navigator.reset({
        index,
        routes: [{name: screen, data}],
      });
    }
  };

  render() {
    return (
      <NavigationContainer ref={navigator}>
        <Stack.Navigator initialRouteName={'LauncherScreen'}>
          {screens.map((e, idx) => {
            return (
              <Stack.Screen
                key={idx}
                name={e.name}
                options={{
                  transitionSpec,
                  headerShown: false,
                  orientation: 'portrait_up',
                  animation:
                    e.name == 'LauncherScreen'
                      ? 'slide_from_left'
                      : 'slide_from_right',
                }}
                component={e.component}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    screen: state.navigation.screen,
    data: state.navigation.data,
    index: state.navigation.index,
    stack: state.navigation.stack,
    resetStack: state.navigation.resetStack,
    removeStack: state.navigation.removeStack,
  };
}
export default connect(mapStateToProps, null)(RootNavigation);
