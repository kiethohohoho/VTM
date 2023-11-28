import { Flex, Tabs, Typography } from 'antd';
import { type SyntheticEvent } from 'react';

import { BackButton } from '@/coreVTM/backbutton';
import { styleH1 } from '@/featureVTM/type';

import { type VIEW_LOGIN } from '../login.interface';
import LoginWithAccount from './components/loginwithaccount/view';
import LoginWithQrCode from './components/loginwithqrcode/view';
interface ILoginViewProps {
  isLoading: boolean;
  otpKey?: string;
  phoneNumber?: string;
  handleSubmit: (values: Record<string, any>, event?: SyntheticEvent<any, Event> | undefined) => void;
  handleBack?: (step: VIEW_LOGIN) => void;
  handleSetSelectRoleToken?: (token: string) => void;
  handleSetSelectStoreToken?: (token: string) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
}

const View = ({ handleSubmit, handleGetResponseSuccess, responseSuccess, isLoading }: ILoginViewProps) => {
  const items = [
    {
      key: '1',
      label: 'Mã QR',
      children: <LoginWithQrCode />,
    },
    {
      key: '2',
      label: 'Tài khoản mật khẩu',
      children: (
        <LoginWithAccount
          handleGetResponseSuccess={handleGetResponseSuccess}
          handleSubmit={handleSubmit}
          responseSuccess={responseSuccess}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: '3',
      label: 'Sinh học',
      children: 'Content of Tab Pane 3',
    },
  ];

  const { Title } = Typography;
  return (
    <Flex
      style={{ width: '40%', minHeight: 530 }}
      justify='center'
      align='center'>
      <Flex
        align='center'
        vertical
        style={{
          backgroundColor: '#fff',
          padding: 40,
          width: '100%',
          borderRadius: 10,
          height: '100%',
        }}>
        <Flex
          vertical
          style={{ width: '100%' }}>
          <Title
            level={1}
            style={styleH1}>
            Đăng nhập
          </Title>
          <Tabs
            style={{ width: '100%' }}
            defaultActiveKey='2'
            items={items}
          />
        </Flex>
        <BackButton
          style={{ marginTop: 'auto' }}
          content='Quay lại trang Dịch vụ'
        />
      </Flex>
    </Flex>
  );
};

export default View;
