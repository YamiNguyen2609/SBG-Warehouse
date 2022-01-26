import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
    ...Styles.center,
  },
  container_button: {
    width: Metrics.width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.large,
  },
  icon: {
    width: Metrics.icon.normal * 1.2,
    height: Metrics.icon.normal * 1.2,
    marginRight: Metrics.margin.regular,
  },
});

export default styles;
