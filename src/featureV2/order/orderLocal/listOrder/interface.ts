import { type STATUS_ORDER } from '@/utils/Enums';

export interface IOrderItem {
  orderId: string;
  orderValue: string;
  orderStatus: STATUS_ORDER;
  orderDate: number;
  purchasersName: string;
  listOrderGoods: IListOrderGoods[];
}

export interface IListOrderGoods {
  goodsId: string;
  variation: string;
  image: string;
  name: string;
  quantity: number;
  price: string;
  productIdStore: string;
}
