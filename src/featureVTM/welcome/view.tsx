import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { EnumPathVTM } from '@/utils/Enums';

import { styleBg, stylePrimaryButton, styleH1 } from '../type';

const WelcomeView = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  return (
    <Flex
      vertical
      align='center'
      justify='center'
      style={styleBg}>
      <Space
        size={20}
        style={{ width: 500 }}
        direction='vertical'
        align='center'>
        <Title
          level={1}
          style={styleH1}>
          Welcome VTM
        </Title>
        <ButtonRootAntD
          style={stylePrimaryButton}
          size='large'
          onClick={() => {
            navigate(EnumPathVTM.OPTIONS);
          }}>
          Lựa chọn options
        </ButtonRootAntD>
      </Space>
    </Flex>
  );
};

export default WelcomeView;
