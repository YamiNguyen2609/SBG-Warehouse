import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    width: Metrics.width,
    backgroundColor: Colors.appWhite,
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
  container_item: {
    padding: 0,
    borderWidth: 1.5,
    borderColor: Colors.overlay1,
    marginHorizontal: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
    marginVertical: 0,
  },
  header: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
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
  container_child: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.margin.regular,
  },
  button: {
    height: 45,
    borderWidth: 1.5,
    borderColor: Colors.appColor_logi,
    paddingHorizontal: Metrics.margin.small + 1,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.medium,
  },
  container_bottom: {
    paddingHorizontal: Metrics.margin.regular,
    paddingBottom: Metrics.margin.large,
  },
});

export default styles;
