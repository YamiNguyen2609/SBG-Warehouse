import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Metrics.width,
    // height: 50,

    zIndex: 900,
  },
  container_image: {
    width: Metrics.width,
    backgroundColor: Colors.appWhite,
    borderTopLeftRadius: Metrics.borderRadius.medium,
    borderTopRightRadius: Metrics.borderRadius.medium,
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.huge,
    paddingHorizontal: Metrics.margin.regular,
  },
  header: {
    paddingBottom: Metrics.margin.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumb: {
    width: Metrics.width / 3.8,
    height: 65,
    borderRadius: Metrics.borderRadius.regular,
    overflow: 'hidden',
    position: 'relative',
  },
  selected: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.overlay3,
    ...Styles.center,
  },
  button: {
    width: Metrics.icon.huge * 1.2,
    height: Metrics.icon.huge * 1.2,
    padding: 0,
    ...Styles.center,
    backgroundColor: Colors.appTrans,
    borderRadius: Metrics.borderRadius.medium,
  },
});

export default styles;
