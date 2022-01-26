import moment from 'moment';
import TMM from './TMMConfig';
import OMM from './OMMConfig';
import {length} from '../helpers/Constants';

const DELIVERY_INCOMPLETE = '/transport_logs/mobile/deliveries';
const DELIVERY_DISMISS = '/transport_logs/mobile/cancelDeliveries';
const DELIVERY_COMPLETE = '/transport_logs/mobile/deliveried';
const PICKUP = '/orders/pick-up/assign';
const REPORT = '/transport_logs/mobile/codCourier';
const LOG = '/transport_logs/mobile/dispathLog';
const LOG_ACCOUNTING = '/accounting/cod/courier/order/';
const INFO = '/orders/info';
const SUCCESS_PICKUP = '/orders/pick-up/complete';
const CANCEL_DELIVERY = '/transport_logs/mobile/failDelivery';
const SUCCESS_DELIVERY = '/transport_logs/mobile/successDelivery';
const UPDATE_AMOUNT = '/orders/transaction';
const REASONS = '/reason_details';
const STATIONS = '/stations';
const DISPATCH = '/manifests/scanDelivery';
const CHECK_IN = '/manifests/scan';
const CHECK_INS = '/checkin_logs';
const CHECK_IN_NEW = '/checkin_logs/scanCheckin';
const CHECK_IN_REMOVE = '/checkin_logs/checkin';
const CHECK_IN_COMPLETE = '/checkin_logs/finishCheckin';
const TRANSFER_ORDER = '/orders/scanSendTransport';
const ORDER_SELLING = '/orders/express/selling';
const UPDATE_SELLING = '/orders/express/selling/rescan';
const UPDATE_WEIGHT = '/orders/express/mobile';
const ORDER_EXPORT = '/orders/fulfillment/details/orderNumber';
const EXPORT = '/orders/fulfillment/exportItem';
const ORDER_RETURN = '/orders/fulfillment/details/orderNumber';

const onDeliveryIncomplete = data => {
  const {offset = 0, keyword, limit = length} = data;

  let params = {
    offset,
    limit: -1,
    sort: 'dateAssigned|DESC',
  };
  if (keyword) {
    params['orderNumber|or'] = 'ilike|' + keyword;
    params['orderNumberClient|or'] = 'ilike|' + keyword;
  }

  return TMM.get(DELIVERY_INCOMPLETE, {params});
};

const onDeliveryComplete = data => {
  const {offset = 0, keyword, limit = length} = data;

  let params = {
    offset,
    limit: -1,
    sort: 'dateAssigned|DESC',
    successDeliveryDate:
      'between|' +
      moment().format('YYYY-MM-DD') +
      ' 00:00:00,' +
      moment().format('YYYY-MM-DD') +
      ' 23:59:59',
  };
  if (keyword) {
    params['orderNumber|or'] = 'ilike|' + keyword;
    params['orderNumberClient|or'] = 'ilike|' + keyword;
  }

  return TMM.get(DELIVERY_COMPLETE, {params});
};

const onDeliveryDismiss = data => {
  const {offset = 0, keyword, limit = length} = data;

  let params = {
    offset,
    limit: -1,
    sort: 'dateAssigned|DESC',
  };
  if (keyword) {
    params['orderNumber|or'] = 'ilike|' + keyword;
    params['orderNumberClient|or'] = 'ilike|' + keyword;
  }

  return TMM.get(DELIVERY_DISMISS, {params});
};

const onPickup = data => {
  const {offset = 0, keyword, limit = length, statusId} = data;

  let params = {
    offset,
    limit: -1,
    statusId,
    sort: 'assignedDate_desc',
    dateCol: 'assignedReceivedDate',
  };
  if (keyword) {
    params['bookingNumber'] = keyword;
  }

  // if (statusId == 16) {
  //   params['start'] = moment().format('YYYY-MM-DD');
  //   params['end'] = moment().format('YYYY-MM-DD');
  // }

  return OMM.get(PICKUP, {params});
};

const onReport = data => {
  return TMM.get(REPORT, {
    params: {
      relation: 'order,employee',
      limit: -1,
    },
  });
};

const onLog = data => {
  data['relation'] = 'order,reason,reasonDetail';
  data['limit'] = -1;

  return TMM.get(LOG, {params: data});
};

const onLogAccounting = data => {
  return OMM.get(LOG_ACCOUNTING + data);
};

const onReasons = data => {
  return TMM.get(REASONS, {
    params: {
      isDeleted: false,
      limit: -1,
      sort: 'code|asc',
      reasonId: 40,
    },
  });
};

const onStations = data => {
  return TMM.get(STATIONS, {
    params: {
      isDeleted: false,
      limit: -1,
      sort: 'name|asc',
    },
  });
};

const onInfo = data => {
  return OMM.post(INFO, {
    orderNumbers: [data],
    attributes: [
      'orderId',
      'orderNumber',
      'senderFee',
      'unitFee',
      'pcs',
      'orderWeightKg',
      'orderNumberClient',
      'senderData',
      'receiverData',
      'remark',
    ],
  });
};

const onSuccessPickup = data => {
  return OMM.put(SUCCESS_PICKUP, data);
};

const onFailureDelivery = data => {
  let params = new FormData();

  const {reasonId, note, images, HAWBs} = data;

  params.append('HAWBs', HAWBs);
  params.append('reasonDetailId', reasonId);
  if (images) {
    images.forEach(e => {
      params.append('images', {
        uri: e.uri,
        type: 'image/jpeg',
        name: e.name,
      });
    });
  }

  if (note) params.append('reasonNote', note);

  return TMM.put(CANCEL_DELIVERY, params);
};

const onUpdateAmount = data => {
  const {transactionTypeId, orderId, payment, payerTypeId} = data;

  var params = {
    transactionTypeId,
    payment,
    payerTypeId: payerTypeId,
    orderId,
  };

  return OMM.post(UPDATE_AMOUNT, params);
};

const onSuccessDelivery = data => {
  let params = new FormData();

  const {receiver, images, HAWBs} = data;

  params.append('HAWBs', HAWBs);
  params.append('reasonDetailId', 53);
  if (images) {
    images.forEach(e => {
      params.append('images', {
        uri: e.uri,
        type: 'image/jpeg',
        name: e.name,
      });
    });
  }

  if (receiver) params.append('senderOrReceiver', receiver);

  return TMM.put(SUCCESS_DELIVERY, params);
};

const onDispatch = data => {
  return TMM.put(DISPATCH, {ids: data});
};

const onCheckIn = (state, data) => {
  switch (state) {
    case 0:
      return TMM.post(CHECK_IN_NEW, data);
    case 1:
      return TMM.put(CHECK_IN, data);
    case 2:
      return TMM.delete(CHECK_IN_REMOVE, data);
    case 3:
      return TMM.put(CHECK_IN_COMPLETE, data);
    case 4:
      return TMM.get(CHECK_INS, {
        params: {
          limit: -1,
          isCheckin: true,
          isDeleted: false,
          status: false,
          isOrder: false,
          stationId: data,
        },
      });
  }
};

const onTransfer = data => {
  return TMM.put(TRANSFER_ORDER, {orderNumber: data});
};

const onSelling = data => {
  return OMM.get(ORDER_SELLING, {
    params: {
      relation: 'service,partner,customerBusiness,customerPersonal',
      orderNumber: data,
    },
  });
};

const updateSelling = data => {
  let orderId = data['orderId'];
  delete data['orderId'];
  return OMM.put(`${UPDATE_SELLING}/${orderId}`, {
    packageDetails: data['packageDetails'],
  });
};

const updateWeight = data => {
  let orderId = data['orderId'];
  delete data['orderId'];
  return OMM.put(`${UPDATE_WEIGHT}/${orderId}`, data);
};

const getOrderExport = data => {
  return OMM.get(`${ORDER_EXPORT}?orderNumbers=${data}`);
};

const getOrderReturn = data => {
  return OMM.get(`${ORDER_RETURN}?orderNumbers=${data}`);
};

const exportOrder = data => {
  return OMM.post(EXPORT, data);
};

export default {
  onDeliveryIncomplete,
  onDeliveryComplete,
  onDeliveryDismiss,
  onPickup,
  onReport,
  onLog,
  onLogAccounting,
  onInfo,
  onSuccessPickup,
  onFailureDelivery,
  onUpdateAmount,
  onSuccessDelivery,
  onReasons,
  onDispatch,
  onCheckIn,
  onTransfer,
  onStations,
  onSelling,
  updateSelling,
  updateWeight,
  getOrderExport,
  exportOrder,
  getOrderReturn,
};
