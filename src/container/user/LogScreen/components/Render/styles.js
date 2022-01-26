import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Styles.center,
  },
  container_item: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
    flexDirection: 'row',
    alignItems: 'center',
    width: Metrics.width,
  },
  header: {
    paddingTop: Metrics.margin.small + 2 + 0.8,
    paddingBottom: Metrics.margin.small + 2,
    paddingLeft: Metrics.margin.small,
    marginTop: -0.8,
    backgroundColor: Colors.appLightGrayColor,
    width: Metrics.width,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: Metrics.borderRadius.medium,
    overflow: 'hidden',
    marginRight: Metrics.margin.regular,
  },
});

export default styles;
