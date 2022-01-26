import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import '../config/ReactotronConfig';
import 'react-native-gesture-handler';

import {store, persistor} from '../redux/ConfigureStore';
import RootContainer from './RootContainer';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(App);
