import { Flex, Form, InputNumber, Typography } from 'antd';
import { type SyntheticEvent } from 'react';

import { ScreenLoader } from '@/core2/loader';
import { BackButton } from '@/coreVTM/backbutton';
import { ButtonRootAntD } from '@/coreVTM/button';
import { styleBg, styleBoxShadow, styleH1, stylePrimaryButton } from '@/featureVTM/type';
import { EnumPathVTM } from '@/utils/Enums';

import OptionsAccount from '../components/optionaccount/view';
import { type Data } from './type';
interface WithdrawViewProps {
  loading: boolean;
  account: Data;
  handleSelectAccount?: (value: any) => void;
  selectOption: any;
  handleSubmit: (values: Record<string, any>, event?: SyntheticEvent<any, Event> | undefined) => void;
}

const WithdrawView = ({ handleSubmit, selectOption, loading, account, handleSelectAccount }: WithdrawViewProps) => {
  const { Title } = Typography;
  if (loading) return <ScreenLoader />;
  return (
    <Flex style={styleBg}>
      <Flex
        style={{ width: '40%', backgroundColor: '#fff', padding: 40, borderRadius: 8, boxShadow: styleBoxShadow }}
        vertical
        justify='center'
        align='center'
        gap={20}>
        <Title
          level={1}
          style={styleH1}>
          Rút tiền
        </Title>
        <Flex
          gap={20}
          vertical
          align='center'
          style={{ width: '100%' }}>
          <Title
            level={3}
            style={styleH1}>
            Danh sách thẻ thanh toán
          </Title>

          <OptionsAccount
            options={account?.account}
            onChange={handleSelectAccount}
            value={selectOption}
          />
        </Flex>
        <Form
          onFinish={handleSubmit}
          style={{ width: '100%' }}
          layout='vertical'>
          <Form.Item
            name='amount'
            key='amount'
            label='Nhập số tiền cần rút'
            rules={[{ required: true, message: 'Vui lòng nhập số tiền cần rút' }]}>
            <InputNumber
              placeholder='Nhập số tiền cần rút!'
              size='large'
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => {
                const numericValue = parseFloat(value?.replace(/₫\s?|(,*)/g, '') || '0');
                return isNaN(numericValue) ? 0 : numericValue;
              }}
            />
          </Form.Item>
          <Flex gap={30}>
            <BackButton
              redirect={EnumPathVTM.SELECT}
              content='Quay lại trang Dịch vụ'
            />
            <Form.Item>
              <ButtonRootAntD
                style={stylePrimaryButton}
                type='primary'
                htmlType='submit'>
                Xác nhận
              </ButtonRootAntD>
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default WithdrawView;
