import { Flex, Form, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { ButtonRootAntD } from '@/coreVTM/button';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import { stylePrimaryButton, styleH1, styleInput } from '@/featureVTM/type';

import { placeholderFormInfor, requiedFormInfor } from '../type';

interface IRegisterOTPProps {
  handleSubmit: (values: any) => void;
  loading?: boolean;
  responseSuccess: any;
  handleResentOTP: () => void;
}

const RegisterOTPView = ({ handleSubmit, handleResentOTP, loading, responseSuccess }: IRegisterOTPProps) => {
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
          MÃ XÁC THỰC
        </Title>
        <Text>
          Vui lòng nhập mã xác thực đã được email{' '}
          {responseSuccess?.responseInfor?.email || responseSuccess?.responseInfor?.data?.email}
        </Text>
        <Form
          onFinish={handleSubmit}
          style={{ marginTop: 40, width: '100%' }}>
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
          <Form.Item>
            <ButtonRootAntD
              style={stylePrimaryButton}
              type='primary'
              htmlType='submit'>
              Xác nhập
            </ButtonRootAntD>
          </Form.Item>
          <Flex
            justify='space-between'
            align='center'>
            {seconds > 0 ? <p>{seconds < 10 ? `0${seconds}` : seconds}</p> : <p>Bạn không nhận được OTP?</p>}
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
        </Form>
      </Flex>
    </Flex>
  );
};

export default RegisterOTPView;
