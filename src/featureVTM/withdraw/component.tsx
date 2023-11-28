import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { LoggerService } from '@/utils/Logger';

import { VIEW_WITHDRAW_VTM } from './type';
// import { type CreateSessionInput, type OutputSession } from './index';
// import { type Data } from './type';
import WithdrawView from './view';

const WithdrawComponent = () => {
  const [view, setView] = useState<VIEW_WITHDRAW_VTM>(VIEW_WITHDRAW_VTM.WITHDRAW);
  const [responseSuccess, setResponseSuccess] = useState<any>({});

  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('WithDrawComponent execute handleGetResponse receive response', response);
      switch (response.view) {
        case VIEW_WITHDRAW_VTM.WITHDRAW:
          setView(VIEW_WITHDRAW_VTM.WITHDRAW);
          setResponseSuccess({ ...responseSuccess, responseWithdraw: response?.data });
          break;
        case VIEW_WITHDRAW_VTM.WITHDRAW_OTP:
          setView(VIEW_WITHDRAW_VTM.WITHDRAW_OTP);
          setResponseSuccess({ ...responseSuccess, responseOTP: response?.data });

          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleBack = (step: VIEW_WITHDRAW_VTM) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleBack receive error', error);
    }
  };

  // Withdraw monney
  // const createNewSession = (input: CreateSessionInput) => {
  //   const result: OutputSession = {
  //     errorcode: 0,
  //     error: 'No error',
  //     timeout: 0,
  //   };
  //   return result;
  // };
  // const handleWithDraw = (param1, param2, param3, numberMoney, numberMoney,noteForEnd) => {
  //   const inputSession = {
  //     command: 'createsession',
  //     sessionID: param1,
  //     note: param2,
  //     revokedest: param3,
  //   };
  //   const inputCheckMoney = {
  //     command: 'check',
  //     amount: numberMoney,
  //   };
  //   const inputWithDrawMoney = {
  //     command: 'withdraw',
  //     amount: numberMoney,
  //   };
  //   const inputEndsession = {
  //     command: 'endsession',
  //     note: noteForEnd,
  //   };
  //   STVTM.createNewSession(inputSession);
  //   STVTM.checkMonney(inputCheckMoney);
  //   STVTM.withDraw(inputWithDrawMoney);
  //   STVTM.endSession(inputEndsession);
  // };
  // handleWithDraw={handleWithDraw()}

  return (
    <WithdrawView
      handleBack={handleBack}
      view={view}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      loading={false}
    />
  );
};

export default WithdrawComponent;
