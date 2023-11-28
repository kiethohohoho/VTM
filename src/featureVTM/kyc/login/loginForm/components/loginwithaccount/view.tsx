import { Flex, Form } from 'antd';
import { type SyntheticEvent } from 'react';

import { ScreenLoader } from '@/core2/loader';
import { ButtonRootAntD } from '@/coreVTM/button';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import InputPassword from '@/coreVTM/inputAntd/InputPassWord';
import { LinkRootAntD } from '@/coreVTM/link';
import { labelFormInfor } from '@/featureVTM/kyc/register/type';
import { styleInput, stylePrimaryButton } from '@/featureVTM/type';

interface LoginProps {
  handleSubmit?: (values: Record<string, any>, event?: SyntheticEvent<any, Event> | undefined) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  isLoading: boolean;
}

const LoginWithAccount = ({ handleSubmit, handleGetResponseSuccess, responseSuccess, isLoading }: LoginProps) => {
  const textStyle = {
    color: 'black',
    fontWeight: 'bold',
  };
  if (isLoading) return <ScreenLoader />;
  return (
    <Flex>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        style={{ width: '100%' }}>
        <Form.Item
          label={labelFormInfor.userName}
          key={'username'}
          name='username'
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
          <InputAntd
            style={styleInput}
            type='text'
            placeholder='Tên đăng nhập'
            defaultValue={'user00'}
          />
        </Form.Item>
        <Form.Item
          label={labelFormInfor.password}
          key={'password'}
          name='password'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
          <InputPassword
            style={styleInput}
            type='password'
            placeholder='Mật khẩu'
            defaultValue={'Ab12312'}
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <LinkRootAntD
            style={textStyle}
            href='/login'>
            Quên mật khẩu?
          </LinkRootAntD>
          <LinkRootAntD
            style={textStyle}
            href='/register'>
            Đăng ký
          </LinkRootAntD>
        </div>
        <Form.Item style={{ marginBottom: 0 }}>
          <ButtonRootAntD
            style={stylePrimaryButton}
            type='primary'
            htmlType='submit'>
            Đăng nhập
          </ButtonRootAntD>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginWithAccount;
