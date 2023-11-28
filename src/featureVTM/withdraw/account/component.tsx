import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet, useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import { VIEW_WITHDRAW_VTM } from '../type';
import { type Data } from './type';
import WithdrawView from './view';

interface WithdrawComponentProps {
  handleBack?: (step: VIEW_WITHDRAW_VTM) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  loading?: boolean;
}

const WithdrawComponent = ({ handleGetResponseSuccess, responseSuccess }: WithdrawComponentProps) => {
  const [account, setAccount] = useState<Data | any>();
  const [selectOption, setSelectOption] = useState<number>();
  const params = useParams();
  const auth = AuthService.getPackageAuth();
  const apiGetAccount: IApiRequest = {
    method: 'get',
    url: 'https://api-vtm.intelin.vn/vtm/account',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      token: auth?.token,
      checking: 'AA',
    },
  };

  const apiWithDraw: IApiRequest = {
    method: 'post',
    url: 'https://api-vtm.intelin.vn/vtm/withdraw',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      token: auth?.token,
      checking: 'AA',
    },
  };

  const funcRequestWithDraw = {
    handleWithDrawSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_WITHDRAW_VTM.WITHDRAW_OTP });
        LoggerService.debug('WithdrawView execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('WithdrawView execute handleRequestSuccess receive error', error);
      }
    },
    handleWithdrawExceedMoney: (data: any) => {
      try {
        LoggerService.info('WithdrawView execute handleWithdrawExceedMoney');
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'withdraw.exceedMoney'} />);
      } catch (error: any) {
        LoggerService.error('WithdrawView execute handleRequestSuccess receive error', error);
      }
    },
  };

  const funcRequest = {
    handleGetAccountSuccess: (data: any) => {
      try {
        setAccount(data);
        setSelectOption(data?.account[0]?.accountNumber);
        LoggerService.debug('WithdrawView execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('WithdrawView execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('WithdrawView execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('WithdrawView execute handleRequestError receive error', error);
      }
    },
  };
  const { mutate } = useRequest(apiWithDraw, funcRequestWithDraw);

  const { isLoading } = useGet({ ...apiGetAccount, params: { deviceId: params?.deviceId } }, funcRequest);
  const handleSelectAccount = (value: any) => {
    setSelectOption(value);
  };

  const handleSubmit = (data: any) => {
    try {
      const payload = {
        amount: data?.amount,
        debitAccount: selectOption,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('Withdraw is error', error);
    }
  };

  return (
    <WithdrawView
      handleSelectAccount={handleSelectAccount}
      selectOption={selectOption}
      account={account}
      loading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
};
export default WithdrawComponent;
