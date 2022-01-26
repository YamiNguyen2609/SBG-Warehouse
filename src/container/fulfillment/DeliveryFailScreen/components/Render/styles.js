import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    ...Styles.card,
    paddingHorizontal: 0,
    marginHorizontal: Metrics.margin.small,
  },
  container_counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.appLightGrayColor,
    marginHorizontal: 0,
    width: '100%',
  },
  button_action: {
    marginLeft: Metrics.margin.regular,
  },
});

export default styles;
