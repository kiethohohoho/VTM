import { type FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailGroupStaffComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  groupStaffId: string;
  storeId: string;
  name: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
}

const initialState: IResponseDetail = {
  groupStaffId: '56f04ef92549b00f92b50189f1d2d5e1',
  storeId: 'a80ae3fdaa5cb00f92b50189cdfa8513',
  name: 'NV kho',
  createdAt: 1691979273000,
  createdBy: 'ls0000000000090',
  modifiedAt: 1691979405000,
  modifiedBy: 'ls0000000000090',
};

const DetailGroupStaffComponent: FunctionComponent<DetailGroupStaffComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail>(initialState);
  const { status, onSetView } = useContext(ContextModal);
  const params = useParams();

  const callbackFunc = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        setDetail(data);
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

  const { isLoading, refetch } = useGet({ ...api, params: { groupStaffId: params?.groupStaffId } }, callbackFunc);
  useEffect(() => {
    if (status === STATUS_MODAL.SUCCESS) {
      refetch();
    }
  }, [status]);
  return (
    <View
      detail={detail}
      loading={isLoading}
      onSetView={onSetView}
    />
  );
};

export default DetailGroupStaffComponent;
