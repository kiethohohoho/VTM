import { type IIndexOfViewDepositVTM } from '../type';
import WaitMoneyComponent from './component';
const IndexWaitMoney = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewDepositVTM) => {
  return (
    <WaitMoneyComponent
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexWaitMoney;
