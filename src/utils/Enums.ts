export enum EnumPath {
  HOME = '/',
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgotPassword',
  RESET_PASSWORD = '/resetPassword',
  DASHBOARD = '/dashboard',
  REGISTER = '/register',
  PROFILE = '/profile',
  STORE = '/store',
  STORE_DETAIL = '/store/detail',
  STORE_CREATE = '/store/create',
  STORE_UPDATE = '/store/update',
  GROUP_STAFF = '/groupStaff',
  GROUP_STAFF_CREATE = '/groupStaff/create',
  GROUP_STAFF_DETAIL = '/groupStaff/detail',
  GROUP_STAFF_INVITE_STAFF = '/inviteStaff',
  CONSUMER = '/consumer',
  CONSUMER_CREATE = '/consumer/create',
  WAREHOUSE = '/warehouse',
  WAREHOUSE_CREATE = '/warehouse/create',
  DEVICE = '/device',
  PRODUCT = '/product',
  CREATE_YOUR_PRODUCT = '/yourProduct/create',
  PRODUCT_INVENTORY = '/productInventory',
  PRODUCT_INVENTORY_O2O = '/productInventory/o2o',
  CATEGORY = '/category',
  CATEGORY_O2O = '/categoryO2O',
  CATEGORY_IN_STORE = '/categoryInStore',
  CATEGORY_CREATE = '/category/create',
  ORDER = '/order',
  DETAIL_ORDER = '/order/:orderId',
  ORDER_CREATE = '/order/create',
  ORDER_PAYMENT = '/order/:orderGroupId/payment',
  ORDER_O2O = '/orderO2O',
  ORDER_O2O_DETAIL = '/orderO2O/:orderId',
  STAFF = '/staff',
  POS = '/pos',
}

export enum EnumPathVTM {
  HOME = '/',
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgotPassword',
  RESET_PASSWORD = '/resetPassword',
  REGISTER = '/register',
  OPTIONS = '/options',
  UI = '/ui',
  WELCOME = '/welcome',
  DEMO = '/demo',
  WITHDRAW = '/private/withdraw',
  DEPOSIT = '/private/deposit',
  SELECT = '/select',
  WITHDRAWRESULT = '/private/withdraw/withdrawresult',
  DEPOSITRESULT = '/depositresult',
  WAITMONEY = '/waitmoney',
  STATISTICS = '/statistics',
  DEMOSDK = '/demosdk',
}

export enum QUERY_KEY {
  CURRENCIES = 'CURRENCIES',
  STORE = 'STORE',
  GOODS_PUBLISH_O2O = 'GOODS_PUBLISH_O2O',
  ORDERS = 'ORDERS',
}
export enum EnumRole {
  SYSTEM = 0,
  ADMIN = 1,
}
export enum EnumUserRole {
  RETAILER = 0,
  BRAND = 1,
}
export enum EnumNationalIDType {
  CCCD = 1,
  CMND = 2,
  PASSPORT = 3,
  NATIONAL_ID = 4,
}
export enum EnumCountry {
  VIETNAM = 1,
  CAMBODIA = 2,
  THAILAND = 3,
  SINGAPORE = 4,
}
export enum EnumGender {
  FEMALE = 0,
  MALE,
}
export enum EnumGenderKhmer {
  MALE = 'ប្រុស',
  FEMALE = 'ស្ត្រី',
}
export enum Order {
  CREATED_AT = 'createdAt',
  MODIFIED_AT = 'modifiedAt',
}
export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export enum From {
  DEFAULT = 0,
}

export enum Limit {
  DEFAULT = 30,
}
export enum STATUS_APPROVE {
  REJECTED = -1,
  PENDING = 0,
  APPROVED = 1,
}
export const STATUS_APPROVE_PARSE = {
  [STATUS_APPROVE.REJECTED]: 'rejected',
  [STATUS_APPROVE.PENDING]: 'pending',
  [STATUS_APPROVE.APPROVED]: 'approved',
};
export enum STATUS_STORE {
  NOT_ACTIVATED = -1,
  LOCKED = 0,
  ACTIVE = 1,
  WAITING = 2,
}
export enum STATUS_DEVICE {
  TRUST = 1,
  UN_TRUST = -1,
  UN_KNOW = 0,
}
export const PARSE_STATUS_DEVICE: any = {
  [STATUS_DEVICE.TRUST]: 'trust',
  [STATUS_DEVICE.UN_TRUST]: 'untrust',
  [STATUS_DEVICE.UN_KNOW]: 'unknown',
};
export const ENUM_PARSE_STATUS_STORE: any = {
  [STATUS_STORE.NOT_ACTIVATED]: 'notActivated',
  [STATUS_STORE.LOCKED]: 'locked',
  [STATUS_STORE.ACTIVE]: 'active',
  [STATUS_STORE.WAITING]: 'waiting',
};

export enum STATUS_GOODS {
  CANCELED = -1,
  WAITING = 0,
  APPROVED = 1,
}

export enum STATUS_PRODUCT_RETAILER {
  REJECTED = 0,
  PENDING_APPROVAL = 1,
  APPROVED = 2,
}

export const ENUM_PARSE_STATUS_PRODUCT_RETAILER: any = {
  [STATUS_PRODUCT_RETAILER.REJECTED]: 'rejected',
  [STATUS_PRODUCT_RETAILER.PENDING_APPROVAL]: 'pendingApproval',
  [STATUS_PRODUCT_RETAILER.APPROVED]: 'approved',
};
export const ENUM_PARSE_STATUS_GOODS: any = {
  [STATUS_GOODS.CANCELED]: 'cancelled',
  [STATUS_GOODS.WAITING]: 'waiting',
  [STATUS_GOODS.APPROVED]: 'approved',
};
export enum STATUS_PUBLISH_O2O {
  LOCAL = 0,
  ISO2O,
  ALL,
}

export const ENUM_PARSE_PUBLISH_O2O: any = {
  [STATUS_PUBLISH_O2O.ISO2O]: 'O2O',
  [STATUS_PUBLISH_O2O.LOCAL]: 'local',
};
export enum STATUS_YES_NO {
  YES = 1,
  NO = 0,
}

export const ENUM_PARSE_STATUS_YES_NO: any = {
  [STATUS_YES_NO.YES]: 'yes',
  [STATUS_YES_NO.NO]: 'no',
};

export enum STATUS_ACCOUNT {
  LOCKED = 0,
  ACTIVE = 1,
}
export const STATUS_ACCOUNT_PARSE = {
  [STATUS_ACCOUNT.LOCKED]: 'locked',
  [STATUS_ACCOUNT.ACTIVE]: 'active',
};

export enum STATUS_ORDER {
  CANCELED = -1,
  PENDING_PAYMENT,
  COMPLETED,
  PREPARING,
  TO_SHIP,
  PACKED,
  READY_TO_SHIP,
  SHIPPING,
  DELIVERED,
  TO_SELLER_RESPONSE,
  RESPONDED,
  RETURN_REFUND,
  CONFIRMED,
  PAYMENT_COD,
}

// export enum GROUP_STATUS_ORDER {
//   TO_SHIP = `${STATUS_ORDER.TO_SHIP},${STATUS_ORDER.PACKED},${STATUS_ORDER.READY_TO_SHIP},${STATUS_ORDER.}`
// }

export const STATUS_ORDER_PARSE: any = {
  [STATUS_ORDER.CANCELED]: 'cancelled',
  [STATUS_ORDER.PENDING_PAYMENT]: 'pendingPayment',
  [STATUS_ORDER.COMPLETED]: 'completed',
  [STATUS_ORDER.PREPARING]: 'preparing',
  [STATUS_ORDER.TO_SHIP]: 'toShip',
  [STATUS_ORDER.PACKED]: 'packed',
  [STATUS_ORDER.READY_TO_SHIP]: 'readyToShip',
  [STATUS_ORDER.SHIPPING]: 'shipping',
  [STATUS_ORDER.DELIVERED]: 'delivered',
  [STATUS_ORDER.TO_SELLER_RESPONSE]: 'toSellerResponse',
  [STATUS_ORDER.RESPONDED]: 'responded',
  [STATUS_ORDER.RETURN_REFUND]: 'returnRefund',
  [STATUS_ORDER.CONFIRMED]: 'confirmed',
  [STATUS_ORDER.PAYMENT_COD]: 'paymentCod',
};

export enum OrderType {
  orderOnline = 1,
  orderOffline = 0,
  walkInGuest = -1,
}

export const ORDER_TYPE_PARSE: any = {
  [OrderType.orderOnline]: 'orderOnline',
  [OrderType.orderOffline]: 'orderOffline',
  [OrderType.walkInGuest]: 'walkingInGuest',
};

export enum PAYMENT_METHOD {
  CASH = 0,
  E_WALLET,
  VISA,
  BANK_TRANSFER,
  COD,
}

export const PAYMENT_METHOD_PARSE: any = {
  [PAYMENT_METHOD.CASH]: 'cash',
  [PAYMENT_METHOD.E_WALLET]: 'e_wallet',
  [PAYMENT_METHOD.VISA]: 'visa',
  [PAYMENT_METHOD.BANK_TRANSFER]: 'bankTransfer',
  [PAYMENT_METHOD.COD]: 'cod',
};

export enum PAYMENT_STATUS {
  FAILED = -1,
  UNPAID,
  PAID,
}

export const PAYMENT_STATUS_PARSE: any = {
  [PAYMENT_STATUS.FAILED]: 'failed',
  [PAYMENT_STATUS.UNPAID]: 'unpaid',
  [PAYMENT_STATUS.PAID]: 'paid',
};

export enum TYPE_NOTIFICATION {
  ORDER = 0,
  CAMPAIGN,
  OTHER,
}

export const TYPE_NOTIFICATION_PARSE: any = {
  [TYPE_NOTIFICATION.ORDER]: 'order',
  [TYPE_NOTIFICATION.CAMPAIGN]: 'campaign',
  [TYPE_NOTIFICATION.OTHER]: 'other',
};

export enum STATUS_NOTIFICATION {
  UNREAD = 0,
  SEEN,
}

export enum TYPE_ORDER_LIST {
  ALL = 0,
  PENDING_PAYMENT,
  TRANSPORT,
  DELIVERING,
  COMPLETE,
  CANCELED,
  RETURN_REFUND,
}

export const TYPE_ORDER_LIST_PARSE: any = {
  [TYPE_ORDER_LIST.ALL]: 'all',
  [TYPE_ORDER_LIST.PENDING_PAYMENT]: 'pendingPayment',
  [TYPE_ORDER_LIST.TRANSPORT]: 'transport',
  [TYPE_ORDER_LIST.DELIVERING]: 'delivering',
  [TYPE_ORDER_LIST.COMPLETE]: 'complete',
  [TYPE_ORDER_LIST.CANCELED]: 'canceled',
  [TYPE_ORDER_LIST.RETURN_REFUND]: 'returnRefund',
};

export enum DEVICE_TYPE {
  WEB,
  ANDROID,
  IOS,
  OTHER,
}

export const DEVICE_TYPE_PARSE: any = {
  [DEVICE_TYPE.WEB]: 'web',
  [DEVICE_TYPE.ANDROID]: 'android',
  [DEVICE_TYPE.IOS]: 'ios',
  [DEVICE_TYPE.OTHER]: 'other',
};
export enum ENUM_COUNTRY {
  VN = 1,
  CAM = 'KH',
  THAI = 3,
  SIN = 4,
}
export enum TYPE_UPLOAD_FILE {
  IMAGE_STORE = 1,
  LS_ACCOUNT_LICENSE = 2,
  PRODUCT_DICTIONARY = 3,
}

export enum PaymentStatus {
  failed = -1, // Payment failed
  unpaid = 0, //  Unpaid
  paid = 1, // Paid
}

export const PaymentStatusPrase: any = {
  [PaymentStatus.failed]: 'failed',
  [PaymentStatus.unpaid]: 'unpaid',
  [PaymentStatus.paid]: 'paid',
};

export enum PaymentMethod {
  cash = 0,
  e_wallet,
  visa,
  bankTransfer,
}

export const PaymentMethodPrase: any = {
  [PaymentMethod.cash]: 'cash',
  [PaymentMethod.e_wallet]: 'e_wallet',
  [PaymentMethod.visa]: 'visa',
  [PaymentMethod.bankTransfer]: 'bankTransfer',
};

export enum StatusOrder {
  cancelled = -1,
  pendingPayment,
  completed,
  preparing,
  toShip,
  packed,
  readyToShip,
  shipping,
  delivered,
  toSellerResponse,
  returnRefund,
  confirmed,
}

export const StatusOrderPrase: any = {
  [StatusOrder.cancelled]: 'cancelled',
  [StatusOrder.pendingPayment]: 'pendingPayment',
  [StatusOrder.completed]: 'completed',
  [StatusOrder.preparing]: 'preparing',
  [StatusOrder.toShip]: 'toShip',
  [StatusOrder.packed]: 'packed',
  [StatusOrder.readyToShip]: 'readyToShip',
  [StatusOrder.shipping]: 'shipping',
  [StatusOrder.delivered]: 'delivered',
  [StatusOrder.toSellerResponse]: 'toSellerResponse',
  [StatusOrder.returnRefund]: 'returnRefund',
  [StatusOrder.confirmed]: 'confirmed',
};
export enum StatusStaff {
  block = 0,
  active,
}
export const StatusStaffParse: any = {
  [StatusStaff.block]: 'staff.status.locked',
  [StatusStaff.active]: 'staff.status.active',
};

export enum TypeDashboardSale {
  getByDate = 1,
  getByMonth,
  getByYear,
}

export enum ProductSource {
  retailer = 0,
  productDictionary = 1,
  barcodeLookup = 2,
  eanSearch = 3,
  brand = 4,
}

export enum TypeFilterProduct {
  all = 0,
  productDictionary = 1,
  retailer = 2,
}
