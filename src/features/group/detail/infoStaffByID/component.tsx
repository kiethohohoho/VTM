import { type FunctionComponent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { type STATUS_ACCOUNT, type STATUS_APPROVE } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface ListGroupStaffComponentProps {
  api: IApiRequest;
}

export interface IList {
  list: IListItem[];
  total: number;
}

export interface IListItem {
  userId: string;
  name: string;
  phone: string;
  status: STATUS_ACCOUNT;
  isDeleted: number;
  createdAt: number;
  modifiedAt: number;
  loginFailedAttempts: number;
  isDistributor: number;
  isBrand: number;
  isRetailer: number;
  isApproved: STATUS_APPROVE;
  isStaff: number;
  lastLogin: number;
  retailerId: string;
}

const ListGroupStaffComponent: FunctionComponent<ListGroupStaffComponentProps> = props => {
  const { api } = props;
  /* hook */
  const [list, setList] = useState<IListItem[]>();
  const navigate = useNavigate();
  const params = useParams();

  const callbackFunc = {
    handleRequestSuccess: (data: IListItem[]) => {
      try {
        LoggerService.debug('ListGroupStaffComponent execute handleRequestSuccess receive list', data);
        setList(data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };

  const { isLoading } = useGet({ ...api, params: { groupStaffId: params?.groupStaffId } }, callbackFunc);
  /* handle */
  const onClickRedirect = (url: string) => {
    navigate(url);
  };
  return (
    <View
      onClickRedirect={onClickRedirect}
      list={list}
      loading={isLoading}
      params={params}
    />
  );
};

export default ListGroupStaffComponent;
