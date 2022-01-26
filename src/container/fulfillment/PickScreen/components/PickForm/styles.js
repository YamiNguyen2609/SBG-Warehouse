import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: Colors.appWhite,
    marginVertical: 0,
    paddingHorizontal: Metrics.margin.regular,
    marginHorizontal: 0,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 100,
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
  container_item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.margin.regular,
  },
  circle: {
    width: Metrics.icon.normal,
    height: Metrics.icon.normal,
    borderRadius: Metrics.icon.normal,
    ...Styles.center,
  },
});

export default styles;
