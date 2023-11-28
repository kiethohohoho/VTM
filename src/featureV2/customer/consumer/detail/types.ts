import { type PaymentMethod, type PaymentStatus, type StatusOrder } from '@/utils/Enums';

export interface IProductOrderDetail {
  barcode: string;
  description: string;
  name: string;
  sku: string;
}
export interface IOrderDetail {
  goodsId: string;
  price: string;
  quantity: number;
  product: IProductOrderDetail;
}
export interface IPaymentRes {
  amountPay: string;
  amountReceived: string;
  paymentId: string;
  paymentMethod: PaymentMethod;
  refundAmount: string;
  status: PaymentStatus;
}
export interface IOrder {
  orderId: string;
  totalPrice: string;
  listOrderDetail: IOrderDetail[];
  paymentRes: IPaymentRes;
  status: StatusOrder;
  createdAt: number;
}
export interface IResponseDetail {
  consumerId: string;
  name: string;
  phone: string;
  registrationDate: number;
  listOrder: IOrder[];
}
