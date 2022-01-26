import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from '@react-native-community/async-storage';

import rootSaga from './RootSaga';
import rootReducer from './RootReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['employee'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(pReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};

export default null;
