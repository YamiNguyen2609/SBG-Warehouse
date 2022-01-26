import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import VersionCheck from 'react-native-version-check';
import CodePush from 'react-native-code-push';
import {firebase} from '@react-native-firebase/messaging';

import {showFlagMessage, hideFlagMessage} from '../../../redux/app';
import Render from './components/Render';

const LauncherScreen = props => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [receive, setReceive] = useState(0);
  const [total, setTotal] = useState(1);

  const getUpdate = async () => {
    CodePush.checkForUpdate()
      .then(update => {
        console.log('update', update);

        if (update) download();
        else navigateScreen();
        // else checkTokenFirebase();
      })
      .catch(err => {
        console.log('err code-push', err);
        // checkTokenFirebase();
      });
  };

  const download = () => {
    CodePush.sync(
      {},
      status => console.log('state', status),
      ({receivedBytes, totalBytes}) => {
        if (total == 1) setTotal(totalBytes);
        setReceive(receivedBytes);
      },
    );
  };

  const navigateScreen = () => {
    let name = props['user'] ? 'Home' : 'LoginScreen';
    //let name = "LoginScreen"
    props.navigation.reset({
      index: 0,
      routes: [{name}],
    });
  };

  useEffect(() => {
    if (load) {
      setLoad(false);
      //navigateScreen();
      getUpdate();
    }
  });

  useEffect(() => {
    if (receive == total) setTimeout(CodePush.restartApp, 300);
  }, [receive]);

  return <Render percent={(receive / total) * 100} />;
};

const mapStateToProps = state => ({
  user: state.employee.user,
});

export default connect(mapStateToProps, null)(LauncherScreen);
