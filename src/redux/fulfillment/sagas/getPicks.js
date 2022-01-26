import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {ACTION, onFailure, onSuccess} from '../redux/getPicks';
import {flagIndicator} from '../../app';
import {Colors} from '../../../assets/styles';
import fulfillment from '../../../api/fulfillment';
import {store} from '../../ConfigureStore';

function* getPicks(action) {
  try {
    let data = {
      pick: {
        flag: 0,
        data: [],
        total: 0,
      },
      allocated: {
        flag: 0,
        data: [],
        total: 0,
      },
    };
    yield put(flagIndicator(true, {color: Colors.appColor}));
    if (action['data'] == -1 || action['data'] == 0) {
      let resIn = yield fulfillment.getOrderPick({
        warehouseId: store.getState().employee.user.warehouse,
      });
      if (resIn['success']) {
        let dataTemp = [];
        let keys = Object.keys(resIn['data']);

        for (let index = 0; index < keys.length; index++) {
          const element = resIn['data'][keys[index]];
          for (j = 0; j < element.length; j++) {
            dataTemp.push(element[j]);
          }
        }

        dataTemp = dataTemp.sort((a, b) => b['orderId'] - a['orderId']);
        let items = [];

        for (let index = 0; index < dataTemp.length; index++) {
          const element = dataTemp[index];
          if (element['quantity'] - element['allocatedQuantity'] > 0) {
            let idex = items.findIndex(x => x['orderId'] == element['orderId']);
            if (idex == -1) {
              orderId = element['orderId'];
              items.push({
                orderId: element['orderId'],
                orderName: element['orderName'],
                orderType: element['orderType'],
                orderRef: element['orderRef'],
                selected: false,
                lines: [element],
              });
            } else {
              let idx = items[idex]['lines'].findIndex(
                x => x['odooProductId'] == element['odooProductId'],
              );
              if (idx == -1)
                items[idex]['lines'] = items[idex]['lines'].concat(element);
              else items[idex]['lines'][idx]['quantity'] += element['quantity'];
            }
          }
        }

        data['pick'] = {
          data: items,
          total: items.length,
        };
      }
    }
    if (action['data'] == -1 || action['data'] == 1) {
      let res = yield fulfillment.getOrderAllocated(action['data']);
      if (res['success']) {
        let dataTemp = [];
        let keys = Object.keys(res['data']);

        for (let index = 0; index < keys.length; index++) {
          const element = res['data'][keys[index]];
          for (j = 0; j < element.length; j++) {
            dataTemp.push(element[j]);
          }
        }

        dataTemp = dataTemp.sort((a, b) => b['orderId'] - a['orderId']);

        let items = [];

        for (let index = 0; index < dataTemp.length; index++) {
          const element = dataTemp[index];
          let idex = items.findIndex(x => x['orderId'] == element['orderId']);
          if (idex == -1) {
            orderId = element['orderId'];
            items.push({
              orderId: element['orderId'],
              orderName: element['orderName'],
              lines: [element],
            });
          } else {
            let idx = items[idex]['lines'].findIndex(
              x => x['odooProductId'] == element['odooProductId'],
            );
            if (idx == -1)
              items[idex]['lines'] = items[idex]['lines'].concat(element);
            else items[idex]['lines'][idx]['quantity'] += element['quantity'];
          }
        }

        data['allocated'] = {
          data: items,
          total: items.length,
        };
      }
    }

    yield put(onSuccess(data));
  } catch {}
  yield put(flagIndicator(false));
}

export default function* saga() {
  yield takeEvery(ACTION, getPicks);
}
