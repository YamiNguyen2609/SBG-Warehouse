import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {logUser} from '../../../redux/user/redux/logUser';
import {length} from '../../../helpers/Constants';

const LogScreen = props => {
  const [load, setLoad] = useState(true);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (load) {
      setLoad(false);
      onMore(true);
    }
  }, []);

  const onMore = refreshing => {
    if (offset * length <= props['total'] || props['total'] == 0) {
      let page = offset + 1;
      setOffset(page);
      dispatch(logUser({offset: page, refreshing}));
    }
  };

  return <Render {...props} onMore={onMore} />;
};

const mapStateToProps = state => ({
  incidents: state.employee.incidents,
  data: state.logUser.data,
  total: state.logUser.total,
  flag: state.logUser.flag,
  company: state.app.company,
});

export default connect(mapStateToProps, null)(LogScreen);
