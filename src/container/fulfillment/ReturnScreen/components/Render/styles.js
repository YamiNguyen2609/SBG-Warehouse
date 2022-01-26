import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Styles.center,
  },
  container_item: {
    paddingHorizontal: Metrics.margin.regular,
    // paddingVertical: Metrics.margin.large,
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
  item_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.margin.large,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.appLightGrayColor,
  },
  item_body: {
    padding: Metrics.margin.large,
  },
  container_input: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.huge * 2,
    paddingTop: Metrics.icon.huge * 1.5,
    paddingBottom: Metrics.icon.regular,
    borderTopLeftRadius: Metrics.borderRadius.large * 1.5,
    borderTopRightRadius: Metrics.borderRadius.large * 1.5,
    width: Metrics.width,
    alignItems: 'center',
  },
  container_text: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.huge * 2,
    paddingTop: Metrics.icon.huge * 1.5,
    paddingBottom: Metrics.icon.regular,
    borderTopLeftRadius: Metrics.borderRadius.large * 1.5,
    borderTopRightRadius: Metrics.borderRadius.large * 1.5,
    width: Metrics.width,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: Metrics.margin.huge,
    borderWidth: 0,
  },
  barcode_icon: {
    ...Styles.center,
    borderRadius: Metrics.icon.huge * 1.5,
    backgroundColor: Colors.appPrimaryColor,
    height: Metrics.icon.huge * 1.5,
    width: Metrics.icon.huge * 1.5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default styles;
