import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { type DataResponse, type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import Config from '@/Config';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import AuthService from '@/utils/Auth';
import { Helper } from '@/utils/Helper';
import { LoggerService as Logger } from '@/utils/Logger';

interface IResponseListCategory {
  list: IListItem[];
  total: number;
}
interface IListItem {
  storeId: string;
  name: string;
  taxNumber: string;
  classification: string;
  license: string;
  address: string;
  cover: string;
  photo: string;
  status: number;
  modifiedAt: number;
  modifiedBy: string;
  userId: string;
  shopName: string;
  description: string;
}
const config = new Config().getState();

export const getListStore = () => {
  const [listStore, setListStore] = useState<IItemDataDropDown[] | []>([]);

  const auth = AuthService.getPackageAuth();
  const apiGetCategory: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.store,
    headers: {
      token: auth?.token,
    },
  };

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(['delete', config.api.lsUser.store]) as DataResponse;

  const funcRequestStore = {
    handleRequestSuccess: (data: IResponseListCategory) => {
      try {
        Logger.debug('getListStore execute handleRequestSuccess receive list', data);
        if (!Helper.isEmpty(data.list)) {
          const list: IItemDataDropDown[] = data.list.map((item: IListItem) => ({
            id: item.storeId,
            text: item.name,
          }));
          setListStore(list);
        }
      } catch (error: any) {
        Logger.error('getListStore execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        Logger.info('getListStore execute handleRequestError');
      } catch (error: any) {
        Logger.error('getListStore execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading } = useGet({ ...apiGetCategory, payload: {} }, funcRequestStore, [], Helper.isEmpty(cachedData));
  if (!Helper.isEmpty(cachedData)) {
    const list: IItemDataDropDown[] = (cachedData.data as IResponseListCategory).list.map((item: IListItem) => ({
      id: item.storeId,
      text: item.name,
    }));
    return { isLoading: false, listStore: list };
  }
  return { isLoading, listStore };
};
