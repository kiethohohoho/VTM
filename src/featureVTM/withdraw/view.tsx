import { Flex } from 'antd';

import IndexWithdraw from './account';
import IndexWithdrawOTP from './otpwithdraw';
import { type IRenderViewVTM, VIEW_WITHDRAW_VTM, type WithdrawViewVTMProps } from './type';
const WithdrawView = ({
  handleGetResponseSuccess,
  view,
  responseSuccess,
  handleBack,
  loading,
}: WithdrawViewVTMProps) => {
  const renderView: IRenderViewVTM = {
    [VIEW_WITHDRAW_VTM.WITHDRAW]: (
      <IndexWithdraw
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
        handleBack={handleBack}
      />
    ),
    [VIEW_WITHDRAW_VTM.WITHDRAW_OTP]: (
      <IndexWithdrawOTP
        handleBack={handleBack}
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
  };
  return <Flex style={{ width: '100%', height: '100%' }}>{renderView[view]}</Flex>;
};

export default WithdrawView;
