import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getProductsPick';
import {flagIndicator, messageWarning} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';
import {store} from '../../ConfigureStore';

function* getProductsPick(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    r.log('vo ne', action['data']['data']);
    let items = action['data']['data'];
    let productIds = [];
    let products = [];
    let lines = [];
    let locations = [];

    let temp_items = items.filter(
      x =>
        x['merchantProduct']
          .toLowerCase()
          .indexOf(action['data']['keyword'].toLowerCase()) > -1 ||
        x['merchantProductNumber']
          .toLowerCase()
          .indexOf(action['data']['keyword'].toLowerCase()) > -1,
    );

    for (let j = 0; j < temp_items.length; j++) {
      const el = temp_items[j];
      lines.push({
        lineId: el['lineId'],
        orderId: el['orderId'],
        productId: el['productId'],
        quantity: el['quantity'],
        pickedQuantity: el['pickedQuantity'],
        allocatedQuantity: el['allocatedQuantity'],
      });
      if (
        !productIds.find(
          x =>
            x.productId == el['productId'] &&
            x.merchantProductId == el['merchantProductId'],
        )
      ) {
        productIds.push({
          productId: el['productId'],
          merchantProductId: el['merchantProductId'],
        });
      }
      let idx = products.findIndex(x => x.productId == el['productId']);
      if (idx == -1) {
        products.push({
          orderName: el['orderName'],
          productId: el['productId'],
          merchantProduct: el['merchantProduct'],
          merchantProductId: el['merchantProductId'],
          merchantProductNumber: el['merchantProductNumber'],
          odooProductName: el['odooProductName'],
          internalRef: el['internalRef'],
          externalRef: el['externalRef'],
          barcode: String(el['barcode']) != 'false' ? el['barcode'] : '',
          quantity: parseFloat(el['quantity']),
          pickedQuantity: parseFloat(el['pickedQuantity']),
          allocatedQuantity: parseFloat(el['allocatedQuantity']),
        });
      } else {
        products[idx]['quantity'] += parseFloat(el['quantity']);
        products[idx]['pickedQuantity'] += parseFloat(el['pickedQuantity']);
        products[idx]['allocatedQuantity'] += parseFloat(
          el['allocatedQuantity'],
        );
      }
    }

    if (productIds.length > 0) {
      let res = yield fulfillment.getProductPicks({
        warehouseId: store.getState().employee.user.warehouse,
        productIds,
      });
      if (res['success']) {
        let data = res['data'];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const product = products.find(
            x => x['productId'] == element['odooProductId'],
          );

          for (let j = 0; j < element['stock'].length; j++) {
            const el = element['stock'][j];
            if (el['stock'] - el['reversedQuantity'] > 0) {
              let idx = locations.findIndex(
                x => x.locationId == el['locationId'],
              );
              let stock = 0;
              let reversedQuantity = 0;
              if (el['stockDetails'].length > 0) {
                let data_stock = el['stockDetails'].filter(x => x.quantity > 0);
                stock = data_stock.map(x => x.quantity).reduce((a, b) => a + b);
              }
              if (idx > -1) {
                locations[idx]['products'].push({
                  ...product,
                  stock,
                  reversedQuantity,
                });
              } else {
                el['products'] = [
                  {
                    ...product,
                    stock,
                    reversedQuantity,
                  },
                ];
                locations.push(el);
              }
            }
          }
        }
      }
    }
    let temp = locations.map(e => e.locationName).sort();

    let data = [];
    let zones = [{id: 0, value: 'Tất cả'}];
    temp.forEach(e => {
      data.push(locations.find(x => e == x['locationName']));
      if (!zones.find(x => x.id == e.substring(0, 1)))
        zones.push({
          id: e.substring(0, 1),
          value: 'Zone ' + e.substring(0, 1),
        });
    });
    r.log('data', productIds, lines, products, data, zones);

    yield put(onSuccess({lines, data, defaultData: items, zones}));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getProductsPick);
}
