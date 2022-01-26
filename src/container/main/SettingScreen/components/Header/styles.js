import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    width: Metrics.width,
    height: (Metrics.width * 800) / 1500 + Metrics.margin.huge,
    paddingLeft: Metrics.margin.regular,
    position: 'relative',
    overflow: 'visible',
    marginTop: -Metrics.margin.huge * 4.5,
    paddingTop: Metrics.margin.huge * 5.3,
  },
  container_info: {
    flex: 1,
    zIndex: 999,
  },
  container_avatar: {
    width: Metrics.icon.regular * 2,
    height: Metrics.icon.regular * 2,
    borderWidth: 2,
    borderColor: Colors.appLightGrayColor,
    borderRadius: Metrics.icon.regular * 2,
    overflow: 'hidden',
    marginRight: Metrics.margin.regular,
  },
  container_employee: {
    flexDirection: 'column',
    height: Metrics.icon.regular * 2,
    justifyContent: 'space-around',
  },
});

export default styles;
