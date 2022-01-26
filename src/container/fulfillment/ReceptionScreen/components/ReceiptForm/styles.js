import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    // elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.margin.small,
    paddingHorizontal: Metrics.margin.small + 2,
    borderWidth: 1.5,
    borderColor: Colors.overlay1,
    marginHorizontal: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
  },
  container_input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.appLightGrayColor,
    marginRight: 0,
  },
});

export default styles;
