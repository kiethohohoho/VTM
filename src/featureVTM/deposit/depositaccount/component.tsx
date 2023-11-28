import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { LoggerService } from '@/utils/Logger';

import { type Data } from '../../withdraw/account/type';
import { VIEW_DEPOSIT_VTM } from '../type';
import DepositView from './view';
// const handleDeposit = (param1, param2, param3) => {
//   const inputSession = {
//     command: 'createsession',
//     sessionID: param1,
//     note: param2,
//     revokedest: param3,
//   };
//   const inputprepareDeposit = {
//     command: 'preparedeposit',
//   };
//   const inputOpenshutter = {
//     command: 'openshutter',
//     note: '<whatever>',
//   };
//   const inputCountmoney = {
//     command: 'count',
//     option: { OpenShutterOnReject: 'true/false' },
//   };
//   const inputDeposit = {
//     command: 'deposit',
//   };
//   STVTM.createNewSession(inputSession);
//   STVTM.preparedeposit(inputprepareDeposit);
//   STVTM.openShutter(inputOpenshutter);
//   STVTM.countMoney(inputCountmoney);
//   STVTM.deposit(inputDeposit);
//   STVTM.canceldeposit(inputDeposit)
//   STVTM.openShutter(inputOpenshutter);
//   STVTM.endSession(inputEndsession);
// };

interface DepositComponentProps {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiGetAccount: IApiRequest;
}

const DepositInfoComponent = ({ handleGetResponseSuccess, responseSuccess, apiGetAccount }: DepositComponentProps) => {
  const [account, setAccount] = useState<Data | any>();
  const [selectOption, setSelectOption] = useState<number>();
  const params = useParams();
  const funcRequest = {
    handleGetAccountSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({ data });
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
  const { isLoading } = useGet({ ...apiGetAccount, params: { deviceId: params?.deviceId } }, funcRequest);
  const handleSelectAccount = (value: any) => {
    setSelectOption(value);
  };

  const handleSubmit = () => {
    handleGetResponseSuccess({ data: selectOption, view: VIEW_DEPOSIT_VTM.DEPOSIT_WAIT });
  };
  return (
    <DepositView
      handleSubmit={handleSubmit}
      handleSelectAccount={handleSelectAccount}
      selectOption={selectOption}
      account={account}
      loading={isLoading}
    />
  );
};

export default DepositInfoComponent;
