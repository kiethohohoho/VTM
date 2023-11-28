import { Flex, Form, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { ScreenLoader } from '@/core2/loader';
import { ButtonRootAntD } from '@/coreVTM/button';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import {
  styleBoxShadow,
  styleH1,
  styleInput,
  stylePrimaryButton,
  styleSecondaryButton,
  styleSmallText,
} from '@/featureVTM/type';

import { placeholderFormInfor, requiedFormInfor } from '../../register/type';
import { VIEW_LOGIN } from '../login.interface';

interface IRegisterOTPProps {
  handleSubmit: (values: any) => void;
  isLoading?: boolean;
  responseSuccess?: any;
  handleResentOTP: () => void;
  handleBack: (step: VIEW_LOGIN) => void;
}

const LoginOTPView = ({ handleSubmit, handleBack, handleResentOTP, isLoading, responseSuccess }: IRegisterOTPProps) => {
  const { Title, Text, Link } = Typography;
  const [seconds, setSeconds] = useState<number>(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  const resendOTP = () => {
    setSeconds(59);
  };

  if (isLoading) return <ScreenLoader />;
  return (
    <Flex
      style={{ height: '100%', width: '100%' }}
      justify='center'
      align='center'>
      <Flex
        style={{ backgroundColor: '#fff', borderRadius: 10, padding: 40, boxShadow: styleBoxShadow }}
        justify='center'
        align='center'
        vertical>
        <Space
          size={20}
          direction='vertical'>
          <Title
            level={1}
            style={styleH1}>
            MÃ XÁC THỰC
          </Title>
          <Text>Vui lòng nhập mã xác thực đã được email {responseSuccess?.responseOTP?.otp?.email}</Text>
          <Form
            onFinish={handleSubmit}
            style={{ width: '100%' }}>
            <Form.Item
              name='code'
              key='code'
              rules={[{ required: true, message: requiedFormInfor.OTP }]}>
              <InputAntd
                style={styleInput}
                type='text'
                placeholder={placeholderFormInfor.OTP}
              />
            </Form.Item>
            <Flex
              gap={30}
              justify='space-between'>
              <Form.Item>
                <ButtonRootAntD
                  style={styleSecondaryButton}
                  type='primary'
                  onClick={() => {
                    handleBack(VIEW_LOGIN.LOGIN);
                  }}>
                  Quay lại trang đăng nhập
                </ButtonRootAntD>
              </Form.Item>
              <Form.Item>
                <ButtonRootAntD
                  style={stylePrimaryButton}
                  type='primary'
                  htmlType='submit'>
                  Xác nhập
                </ButtonRootAntD>
              </Form.Item>
            </Flex>
            <Flex
              justify='space-between'
              align='center'>
              {seconds > 0 ? (
                <Text style={styleSmallText}>{seconds < 10 ? `0${seconds}` : seconds}</Text>
              ) : (
                <Text style={styleSmallText}>Bạn không nhận được OTP?</Text>
              )}
              <Link
                style={styleSmallText}
                disabled={seconds > 0}
                onClick={() => {
                  handleResentOTP();
                  resendOTP();
                }}>
                Gửi lại mã OTP
              </Link>
            </Flex>
          </Form>
        </Space>
      </Flex>
    </Flex>
  );
};

export default LoginOTPView;
