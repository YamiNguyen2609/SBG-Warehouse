import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container_icon: {
    width: Metrics.icon.huge * 2,
    height: Metrics.icon.huge * 2,
    backgroundColor: '#d2edf8',
    marginBottom: -Metrics.icon.huge,
    zIndex: 999,
    borderRadius: Metrics.icon.huge * 2,
    ...Styles.center,
  },
  icon: {
    width: Metrics.icon.huge,
    height: Metrics.icon.huge,
  },
  button: {
    width: '48%',
    padding: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.medium,
    ...Styles.center,
  },
});

export default styles;
