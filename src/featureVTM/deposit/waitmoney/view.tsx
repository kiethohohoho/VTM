import { Flex, Typography } from 'antd';

import { LoaderRoot } from '@/core2/loader';

import { styleBg, styleH1 } from '../../type';
import { type VIEW_DEPOSIT_VTM } from '../type';
interface WaitMoneyProps {
  handleBack?: (step: VIEW_DEPOSIT_VTM) => void;
  handleGetResponseSuccess?: any;
  responseSuccess?: any;
}
const WaitMoneyView = ({ handleGetResponseSuccess, responseSuccess }: WaitMoneyProps) => {
  const { Title } = Typography;
  return (
    <Flex
      style={styleBg}
      vertical>
      <Title
        level={1}
        style={styleH1}>
        Vui lòng bỏ tiền vào hộp
      </Title>
      <div style={{ width: '50%', height: 100 }}>
        <LoaderRoot style={{ height: 100 }} />
      </div>
    </Flex>
  );
};

export default WaitMoneyView;
