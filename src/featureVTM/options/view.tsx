import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@/coreVTM/backbutton';
import { ButtonRootAntD } from '@/coreVTM/button';
import AuthService from '@/utils/Auth';
import { EnumPathVTM } from '@/utils/Enums';

import { styleBg, styleH1, stylePrimaryButton } from '../type';

const OptionsView = () => {
  const navigate = useNavigate();

  const { Title } = Typography;
  return (
    <Flex style={styleBg}>
      <Flex
        vertical
        align='center'
        justify='center'>
        <Title
          level={1}
          style={styleH1}>
          Danh mục dịch vụ
        </Title>
        <Space
          style={{ marginTop: 30, width: 400 }}
          direction='vertical'
          size={20}>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              navigate(EnumPathVTM.SELECT);
            }}>
            Nộp / Rút tiền
          </ButtonRootAntD>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              AuthService.handleLogout();
              navigate(EnumPathVTM.REGISTER);
            }}>
            Đăng ký mở tài khoản
          </ButtonRootAntD>

          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'>
            Khác
          </ButtonRootAntD>
          <BackButton
            redirect={EnumPathVTM.HOME}
            content='Quay lại trang Welcome'
          />
        </Space>
      </Flex>
    </Flex>
  );
};

export default OptionsView;
