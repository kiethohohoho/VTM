import { Loader } from '@progress/kendo-react-indicators';
import { Flex, Form, Typography } from 'antd';

import { ButtonRootAntD } from '@/coreVTM/button';
import { CheckboxRootAntD } from '@/coreVTM/checkbox';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import InputPassword from '@/coreVTM/inputAntd/InputPassWord';
import { styleH1, styleInput, stylePrimaryButton } from '@/featureVTM/type';

import { labelFormInfor, placeholderFormInfor, requiedFormInfor } from '../type';

interface IRegisterAccountProps {
  handleSubmit: (values: any) => void;
  loading?: boolean;
  responseSuccess: any;
  handleGetResponseSuccess: any;
  handleChangeInputUserName: (value: any) => void;
}

const RegisterAccountView = ({ handleSubmit, responseSuccess, handleChangeInputUserName }: IRegisterAccountProps) => {
  const { Title } = Typography;
  if (!responseSuccess) return <Loader />;
  return (
    <Flex
      style={{ height: '100%', width: '100%' }}
      justify='center'
      align='center'>
      <Flex
        style={{ backgroundColor: '#fff', borderRadius: 10, padding: 80 }}
        justify='center'
        align='center'
        vertical>
        <Title
          level={1}
          style={styleH1}>
          Đăng ký
        </Title>
        <Form
          layout='vertical'
          onFinish={handleSubmit}
          style={{ marginTop: 40, width: '100%' }}>
          <Form.Item
            name='username'
            key='username'
            label={labelFormInfor.userName}
            rules={[{ required: true, message: requiedFormInfor.userName }]}>
            <InputAntd
              style={styleInput}
              type='text'
              placeholder={placeholderFormInfor.userName}
              onChange={handleChangeInputUserName}
            />
          </Form.Item>
          <Form.Item
            name='password'
            key='password'
            label={labelFormInfor.password}
            rules={[{ required: true, message: requiedFormInfor.password }]}>
            <InputPassword
              style={styleInput}
              type='text'
              placeholder={placeholderFormInfor.OTP}
            />
          </Form.Item>
          <Form.Item
            label={labelFormInfor.confirmPassword}
            dependencies={['password']}
            hasFeedback
            name='confirmPassword'
            key='confirmPassword'
            rules={[
              { required: true, message: requiedFormInfor.confirmPassword },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    await Promise.resolve();
                    return;
                  }
                  return await Promise.reject(new Error('Mật khẩu không khớp'));
                },
              }),
            ]}>
            <InputPassword
              style={styleInput}
              type='text'
              placeholder={placeholderFormInfor.OTP}
            />
          </Form.Item>
          <Form.Item
            key={'isCheck'}
            name='isCheck'
            rules={[{ required: true, message: requiedFormInfor.isRegCard }]}>
            <CheckboxRootAntD content='Tôi đồng ý các Điều khoản và Điều kiện của ABC' />
          </Form.Item>
          <Form.Item>
            <ButtonRootAntD
              style={stylePrimaryButton}
              type='primary'
              htmlType='submit'>
              Xác nhập
            </ButtonRootAntD>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default RegisterAccountView;
