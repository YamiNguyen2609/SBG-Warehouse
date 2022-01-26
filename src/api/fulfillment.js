import {length} from '../helpers/Constants';
import ERP from './ERPConfig';

const NEW = '/mobile/get/replenishments/new';
const RECEIPTS = '/mobile/get/replenishments/receipt';
const RECEIPT_ID = '/mobile/get/replenishments/details';
const RECEIPT_CODE = '/mobile/get/replenishments/details/based_on_order';
const RECEIPT_LINE = 'inventory/action/receipt/line';
const RECEIPT_ORDER = 'inventory/action/receipt/order';
const PICKS = '/mobile/get/fulfillment/lines/';
const LOCATION = '/mobile/get/location/barcode';
const LOCATIONS = '/mobile/get/locations';
const LOCATION_SCRAPS = '/inventory/get/scrap/location';
const ALLOCATED = '/mobile/get/fulfillment/allocated';
const PUT_ORDER = '/mobile/action/replenishments/put';
const PICK_ORDER = '/mobile/action/fulfillment/pick';
const STOCK_LOCATION = '/mobile/get/fulfillment/transfer';
const TRANSFER = '/mobile/action/fulfillment/transfer';
const PRODUCT_PICK = '/mobile/get/reverse/quantity';
const RETURN_ORDER = '/inventory/action/create/return/order';

const getOrderReceipts = (data = {}) => {
  return ERP.post(RECEIPTS, data);
};

const getOrderNew = (data = {}) => {
  return ERP.post(NEW, data);
};

const getOrderId = (data = {}) => {
  return ERP.get(`${RECEIPT_ID}/${data}`, {
    params: {},
  });
};

const getOrderCode = (data = {}) => {
  return ERP.get(`${RECEIPT_CODE}/${data}`, {
    params: {},
  });
};

const receiptLine = (data = {}) => {
  console.log('data', data);
  return ERP.post(RECEIPT_LINE, data);
};

const receiptOrder = (orderId = {}) => {
  return ERP.post(RECEIPT_ORDER, {orderId});
};

const getOrderPick = (data = {}) => {
  return ERP.post(PICKS, data);
};

const getOrderAllocated = (data = {}) => {
  return ERP.get(ALLOCATED, {
    params: data,
  });
};

const getLocation = (data = {}) => {
  return ERP.get(`${LOCATION}/${data}`, {
    params: {},
  });
};

const getLocations = (data = {}) => {
  data['isLastLocation'] = 1;
  return ERP.post(LOCATIONS, data);
};

const getLocationScraps = (data = {}) => {
  data['isLastLocation'] = 1;
  return ERP.post(LOCATION_SCRAPS, data);
};

const putOrder = (data = {}) => {
  return ERP.post(PUT_ORDER, data);
};

const getProductPicks = data => {
  return ERP.post(PRODUCT_PICK, data);
};

const pickOrder = (data = {}) => {
  console.log('vo ne', data);
  return ERP.post(PICK_ORDER, data);
};

const getStocks = (data = {}) => {
  return ERP.get(`${STOCK_LOCATION}/${data}`);
};

const transferLocation = (data = {}) => {
  return ERP.post(TRANSFER, data);
};

const returnOrder = (data = {}) => {
  return ERP.post(RETURN_ORDER, data);
};

export default {
  getOrderReceipts,
  getOrderNew,
  getOrderId,
  getOrderCode,
  receiptLine,
  receiptOrder,
  getOrderPick,
  getOrderAllocated,
  getLocation,
  putOrder,
  getLocations,
  pickOrder,
  getStocks,
  transferLocation,
  getProductPicks,
  getLocationScraps,
  returnOrder,
};
