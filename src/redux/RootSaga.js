import {fork, all} from 'redux-saga/effects';

//root
import messageError from './notify/messageError';

//user
import loginUser from './user/sagas/loginUser';
import updatePassword from './user/sagas/updatePassword';

//order
import checkIn from './order/sagas/checkIn';
import getStations from './order/sagas/getStations';
import getCheckIns from './order/sagas/getCheckIns';
import finishCheckIn from './order/sagas/finishCheckIn';
import transferOrder from './order/sagas/transferOrder';
import getSelling from './order/sagas/getSelling';
import updateSelling from './order/sagas/updateSelling';
import updateWeight from './order/sagas/updateWeight';
import getOrderExport from './order/sagas/getOrderExport';
import exportOrder from './order/sagas/exportOrder';
import getReasons from './order/sagas/getReasons';

//fulfillment
import getReceipts from './fulfillment/sagas/getReceipts';
import getReceipt from './fulfillment/sagas/getReceipt';
import receiptOrder from './fulfillment/sagas/receiptOrder';
import getPicks from './fulfillment/sagas/getPicks';
import getLot from './fulfillment/sagas/getLot';
import getLots from './fulfillment/sagas/getLots';
import putOrder from './fulfillment/sagas/putOrder';
import pickOrder from './fulfillment/sagas/pickOrder';
import getStocks from './fulfillment/sagas/getStocks';
import transferLocation from './fulfillment/sagas/transferLocation';
import getProductsPick from './fulfillment/sagas/getProductsPick';
import returnOrder from './order/sagas/returnOrder';

export default function* rootSaga() {
  yield all([
    fork(loginUser),
    fork(messageError),
    fork(updatePassword),
    fork(checkIn),
    fork(getStations),
    fork(getCheckIns),
    fork(finishCheckIn),
    fork(transferOrder),
    fork(getSelling),
    fork(updateSelling),
    fork(updateWeight),
    fork(getReceipts),
    fork(getReceipt),
    fork(receiptOrder),
    fork(getPicks),
    fork(getLot),
    fork(putOrder),
    fork(getLots),
    fork(pickOrder),
    fork(getStocks),
    fork(transferLocation),
    fork(getProductsPick),
    fork(getOrderExport),
    fork(exportOrder),
    fork(returnOrder),
    fork(getReasons),
  ]);
}
