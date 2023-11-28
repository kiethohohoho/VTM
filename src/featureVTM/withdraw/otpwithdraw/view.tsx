import { Flex, Form, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { ScreenLoader } from '@/core2/loader';
import { ButtonRootAntD } from '@/coreVTM/button';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import { styleBg, styleH1, styleInput, stylePrimaryButton } from '@/featureVTM/type';

interface OTPProps {
  handleSubmit: (values: any) => void;
  handleResentOTP: () => void;
  isLoading: boolean;
}

const OTPView = ({ handleResentOTP, handleSubmit, isLoading }: OTPProps) => {
  const { Title, Link, Text } = Typography;
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
    <Flex style={styleBg}>
      <Flex
        style={{ backgroundColor: '#fff', padding: 40, borderRadius: 8 }}
        vertical
        justify='center'
        align='center'>
        <Title
          level={1}
          style={styleH1}>
          Xác nhận mã OTP
        </Title>
        <Form
          style={{ width: '100%', marginTop: 20 }}
          onFinish={handleSubmit}>
          <Form.Item
            key='codeOTP'
            name='codeOTP'
            rules={[{ required: true, message: 'Vui lòng nhập mã otp' }]}>
            <InputAntd
              type='number'
              style={styleInput}
              placeholder='Vui lòng nhập mã OTP!'
            />
          </Form.Item>
          <Form.Item>
            <ButtonRootAntD
              style={stylePrimaryButton}
              htmlType='submit'>
              Xác nhận
            </ButtonRootAntD>
          </Form.Item>
        </Form>
        <Flex
          style={{ width: '100%' }}
          justify='space-between'
          align='center'>
          {seconds > 0 ? (
            <Text type='warning'>{seconds < 10 ? `0${seconds}` : seconds}</Text>
          ) : (
            <p>Bạn không nhận được OTP?</p>
          )}
          <Link
            disabled={seconds > 0}
            onClick={() => {
              handleResentOTP();
              resendOTP();
            }}>
            {' '}
            Gửi lại mã OTP
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OTPView;
