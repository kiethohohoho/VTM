import { Flex } from 'antd';

import { styleBg } from '@/featureVTM/type';

import IndexDepositAccount from './depositaccount';
import IndexDepositResult from './depositresult';
import IndexStatisticsComponent from './statistics';
import { type DepositViewVTMProps, type IRenderViewVTM, VIEW_DEPOSIT_VTM } from './type';
import IndexWaitMoney from './waitmoney';
const DepositView = ({ handleGetResponseSuccess, view, responseSuccess, handleBack, loading }: DepositViewVTMProps) => {
  const renderView: IRenderViewVTM = {
    [VIEW_DEPOSIT_VTM.DEPOSIT]: (
      <IndexDepositAccount
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
        handleBack={handleBack}
      />
    ),
    [VIEW_DEPOSIT_VTM.DEPOSIT_WAIT]: (
      <IndexWaitMoney
        handleBack={handleBack}
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_DEPOSIT_VTM.DEPOSIT_STATISTICS]: (
      <IndexStatisticsComponent
        handleBack={handleBack}
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_DEPOSIT_VTM.DEPOSIT_RESULT]: <IndexDepositResult />,
  };
  return <Flex style={styleBg}>{renderView[view]}</Flex>;
};

export default DepositView;
