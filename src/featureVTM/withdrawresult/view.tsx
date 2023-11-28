import { Flex, Space, Typography } from 'antd';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { ImageRootAntD } from '@/coreVTM/image';
import AuthService from '@/utils/Auth';
import { EnumPathVTM } from '@/utils/Enums';

// import { LogoutComponent } from '../logout/component';
import { styleBg, styleH1, stylePrimaryButton } from '../type';
interface ResultViewProps {
  title?: string;
  pageRedirect?: string;
  buttonContent?: string;
}
const ResultView: FC<ResultViewProps> = ({ title, pageRedirect, buttonContent }) => {
  const navigate = useNavigate();

  const { Title } = Typography;
  return (
    <Flex style={styleBg}>
      <Flex
        align='center'
        justify='space-between'
        vertical>
        <Space
          direction='vertical'
          align='center'>
          <div style={{ width: 200, padding: 1, backgroundColor: '#ffffff', borderRadius: '100%' }}>
            <ImageRootAntD src='https://bantimescity.vn/wp-content/uploads/2021/02/Tich-xanh.png' />
          </div>
          <Title
            level={1}
            style={styleH1}>
            {title}
          </Title>
        </Space>
        <Space
          size={20}
          direction='vertical'
          style={{ marginTop: 28, width: 500 }}>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              navigate(EnumPathVTM.SELECT);
            }}>
            {buttonContent}
          </ButtonRootAntD>

          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'>
            In biên lai
          </ButtonRootAntD>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              AuthService.handleLogout();
              navigate(EnumPathVTM.HOME);
            }}>
            Thoát và Đăng xuất
          </ButtonRootAntD>
          {/* <LogoutComponent content='Thoát và đăng xuất' /> */}
        </Space>
      </Flex>
    </Flex>
  );
};

export default ResultView;
