import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.appWhite,
    elevation: 10,
  },
  button_action: {
    flex: 1,
    ...Styles.center,
    paddingVertical: Metrics.margin.huge,
    borderBottomWidth: 5,
    borderBottomColor: Colors.appWhite,
  },
});

export default styles;
