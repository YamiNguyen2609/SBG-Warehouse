import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    width: Metrics.width - Metrics.margin.small,
    backgroundColor: Colors.appTrans,
    alignItems: 'center',
  },
  password: {
    marginHorizontal: Metrics.margin.huge,
    paddingRight: Metrics.margin.regular,
    paddingLeft: Metrics.margin.tiny,
    borderWidth: 0,
  },
  button: {
    marginVertical: Metrics.margin.regular,
    borderWidth: 0,
    backgroundColor: Colors.appWhite,
    width: Metrics.width - Metrics.margin.huge * 8,
    paddingVertical: Metrics.margin.large,
  },
});

export default styles;
