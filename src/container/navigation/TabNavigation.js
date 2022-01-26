import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import {Colors, Images, Styles} from '../../assets/styles';
import {Text} from '../../components';

import HomeScreen from '../main/HomeScreen';
import SettingScreen from '../main/SettingScreen';

const screens = [
  {
    title: 'Trang chủ',
    component: HomeScreen,
    name: 'HomeScreen',
    company: '',
    role: [1, 3, 4],
  },
  {
    title: 'Tài khoản',
    component: SettingScreen,
    name: 'SettingScreen',
    company: '',
    role: [1, 3, 4],
  },
];

const Tab = createBottomTabNavigator();

class TabNavigation extends React.Component {
  render() {
    let {company, user} = this.props;

    let role = 3;

    if (user) {
      role = user['role'];
      company =
        user['role'] == 3 ? company : company != 'logi' ? 'sbp' : 'logi';
    } else {
      company = 'sbp';
    }

    return (
      <Tab.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            const {title, name} = route.params;
            switch (name) {
              case 'HomeScreen':
                iconName = focused
                  ? Images[company]['icHomeActive']
                  : Images['icHome'];
                break;
              case 'SettingScreen':
                iconName = focused
                  ? Images[company]['icUserActive']
                  : Images['icUser'];
                break;
              case 'ManifestsScreen':
                iconName = focused
                  ? Images[company]['icOrderActive']
                  : Images['icOrder'];
                break;
              case 'OrdersScreen':
                iconName = focused
                  ? Images[company]['icOrderActive']
                  : Images['icOrder'];
                break;
            }

            return (
              <View style={Styles.center}>
                <FastImage source={iconName} style={{width: 30, height: 30}} />
                <Text
                  text={title}
                  size={10}
                  color={focused ? Colors[`appColor_${company}`] : '#878787'}
                />
              </View>
            );
          },
          tabBarShowLabel: false,
        })}>
        {screens
          .filter(
            e =>
              (e.company == '' || e.company == company) &&
              e.role.indexOf(role) > -1,
          )
          .map(e => {
            return (
              <Tab.Screen
                key={e.name}
                name={e.name}
                options={{
                  headerShown: false,
                }}
                component={e.component}
                initialParams={e}
                listeners={{
                  tabPress: el => {},
                }}
              />
            );
          })}
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.app.company,
    user: state.employee.user,
  };
};

export default connect(mapStateToProps, null)(TabNavigation);
