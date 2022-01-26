import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {},
  card: {
    ...Styles.card,
    ...Styles.center,
    flex: 0,
    borderWidth: 0,
    width: (Metrics.width - Metrics.margin.regular * 4) / 3,
    marginHorizontal: 0,
    borderRadius: Metrics.borderRadius.large,
    paddingBottom: Metrics.margin.small,
    marginBottom: Metrics.margin.small,
  },
  container_button: {
    flex: 1,
  },
  icon: {
    width: (Metrics.width / 2 - Metrics.margin.regular * 2) / 2.7,
    height: (Metrics.width / 2 - Metrics.margin.regular * 2) / 2.7,
    marginBottom: Metrics.margin.regular,
    backgroundColor: '#e4f5fc',
    borderRadius: Metrics.width,
  },
  title: {
    height: 40,
    ...Styles.center,
  },
});

export default styles;
