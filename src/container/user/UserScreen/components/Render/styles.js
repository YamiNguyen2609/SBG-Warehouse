import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.huge,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.appLightGrayColor,
  },
});

export default styles;
