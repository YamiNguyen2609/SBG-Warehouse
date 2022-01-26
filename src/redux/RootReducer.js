import {combineReducers} from 'redux';

import app from './app';
import navigation from './navigation';

//user
import employee from './user/employee';
import loginUser from './user/redux/loginUser';
import updatePassword from './user/redux/updatePassword';

//order
import checkIn from './order/redux/checkIn';
import getStations from './order/redux/getStations';
import getCheckIns from './order/redux/getCheckIns';
import finishCheckIn from './order/redux/finishCheckIn';
import transferOrder from './order/redux/transferOrder';
import getSelling from './order/redux/getSelling';
import updateSelling from './order/redux/updateSelling';
import updateWeight from './order/redux/updateWeight';
import getOrderExport from './order/redux/getOrderExport';
import exportOrder from './order/redux/exportOrder';
import getReasons from './order/redux/getReasons';

//fulfillment
import getReceipts from './fulfillment/redux/getReceipts';
import getReceipt from './fulfillment/redux/getReceipt';
import receiptOrder from './fulfillment/redux/receiptOrder';
import getPicks from './fulfillment/redux/getPicks';
import getLot from './fulfillment/redux/getLot';
import getLots from './fulfillment/redux/getLots';
import putOrder from './fulfillment/redux/putOrder';
import pickOrder from './fulfillment/redux/pickOrder';
import getStocks from './fulfillment/redux/getStocks';
import transferLocation from './fulfillment/redux/transferLocation';
import getProductsPick from './fulfillment/redux/getProductsPick';
import returnOrder from './order/redux/returnOrder';

const rootReducer = combineReducers({
  app,
  employee,
  loginUser,
  navigation,
  updatePassword,
  checkIn,
  getStations,
  getCheckIns,
  finishCheckIn,
  transferOrder,
  getSelling,
  updateSelling,
  updateWeight,
  getReceipts,
  getReceipt,
  receiptOrder,
  getPicks,
  getLot,
  getLots,
  putOrder,
  pickOrder,
  getStocks,
  transferLocation,
  getProductsPick,
  getOrderExport,
  exportOrder,
  returnOrder,
  getReasons,
});

export default rootReducer;
