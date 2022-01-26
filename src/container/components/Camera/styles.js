import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

let index = -3;

let inputSize = 46 + Metrics.margin.regular * 2;

const styles = StyleSheet.create({
  container: {
    width: Metrics.width,
    height: Metrics.height,
  },
  container_absolute: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  container_around: {
    flex: 1,
    backgroundColor: Colors.overlay7,
  },
  container_barcode: {
    width: Metrics.width - Metrics.margin.huge * 2,
    height: (Metrics.width - Metrics.margin.huge * 2) / 2,
    zIndex: 999,
  },
  container_search: {
    backgroundColor: Colors.whiteOverlay8,
    width: Metrics.width + Metrics.margin.regular,
    height: inputSize,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
  },
  barcode: {
    position: 'absolute',
    zIndex: 999,
    width: Metrics.width - Metrics.margin.huge * 2 + 6,
    height: (Metrics.width - Metrics.margin.huge * 2) / 2 + 6,
    borderColor: Colors.appGreen,
    borderWidth: 3,
    borderRadius: Metrics.borderRadius.regular,
    top: index,
    left: index,
  },
  container_header: {
    zIndex: 1000,
    position: 'absolute',
    top: Metrics.margin.huge - 2,
    left: 0,
    width: Metrics.width,
    paddingVertical: Metrics.margin.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
  },
  icon: {
    width: Metrics.icon.large,
    height: Metrics.icon.large,
    ...Styles.center,
  },
  input: {
    backgroundColor: Colors.appWhite,
    borderColor: Colors.appLightGrayColor,
    width: '79%',
  },
});

export default styles;
