import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Metrics.icon.huge * 4,
    height: Metrics.icon.huge * 4,
    marginLeft: Metrics.margin.large,
    marginVertical: -Metrics.icon.huge,
  },
  card: {
    ...Styles.card,
    ...Styles.center,
    flex: 0,
    borderWidth: 0,
    width: Metrics.width / 2 - Metrics.margin.regular * 2,
    marginHorizontal: 0,
    borderRadius: Metrics.borderRadius.large,
    marginVertical: Metrics.margin.small,
  },
  container_button: {
    flex: 1,
  },
  icon: {
    width: (Metrics.width / 2 - Metrics.margin.regular * 2) / 2.7,
    height: (Metrics.width / 2 - Metrics.margin.regular * 2) / 2.7,
    marginBottom: Metrics.margin.regular,
  },
  item_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.margin.regular,
    // backgroundColor: 'red',
  },
});

export default styles;
