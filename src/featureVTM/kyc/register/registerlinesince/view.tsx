import { Flex, Form, Typography } from 'antd';
import { useState } from 'react';

import { ScreenLoader } from '@/core2/loader';
import { BackButton } from '@/coreVTM/backbutton';
import { ButtonRootAntD } from '@/coreVTM/button';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import { SelectionCommon } from '@/coreVTM/selection/Selection';
import { styleBoxShadow, styleH1, styleInput, stylePrimaryButton } from '@/featureVTM/type';
import { EnumPathVTM } from '@/utils/Enums';

import { labelFormInfor, optionSelect, placeholderFormInfor, requiedFormInfor } from '../type';
// import { getValidationRule } from '.';

interface IRegisterLicenseProps {
  handleSubmit: (values: any) => void;
  loading?: boolean;
  handleSkip?: () => void;
}

const RegisterLicenseView = ({ handleSubmit, loading, handleSkip }: IRegisterLicenseProps) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState<number>(0);
  const { Title } = Typography;
  const handleSelectionChange = (value: any) => {
    setSelectedOptionValue(Number(value));
  };
  const getPlaceholder = (selectedOptionValue: number): string => {
    switch (selectedOptionValue) {
      case 0:
        return placeholderFormInfor.CMND;
      case 1:
        return placeholderFormInfor.CCCD;
      case 2:
        return placeholderFormInfor.Passport;
      default:
        return labelFormInfor.CMND;
    }
  };
  const getLabel = (selectedOptionValue: number) => {
    switch (selectedOptionValue) {
      case 0:
        return labelFormInfor.CMND;
      case 1:
        return labelFormInfor.CCCD;
      case 2:
        return labelFormInfor.Passport;
      default:
        return labelFormInfor.CMND;
    }
  };
  if (loading) return <ScreenLoader />;
  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
      justify='center'
      align='center'>
      <Flex
        vertical
        style={{ width: '40%', backgroundColor: '#fff', borderRadius: 10, padding: 40, boxShadow: styleBoxShadow }}>
        <Title
          level={1}
          style={styleH1}>
          Đăng ký
        </Title>
        <Form
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={{
            licenseType: optionSelect[0],
          }}>
          <Form.Item
            key='licenseType'
            name='licenseType'
            label={labelFormInfor.license}>
            <SelectionCommon
              options={optionSelect}
              value={selectedOptionValue}
              onChange={handleSelectionChange}
            />
          </Form.Item>
          <Form.Item
            key='license'
            name='license'
            label={getLabel(selectedOptionValue)}
            // rules={getValidationRule({ selectedOptionValue, requiedFormInfor })}
          >
            <InputAntd
              style={styleInput}
              type='number'
              placeholder={getPlaceholder(selectedOptionValue)}
            />
          </Form.Item>
          <Form.Item
            label={labelFormInfor.customerName}
            key='customerName'
            name='customerName'
            rules={[{ required: true, message: requiedFormInfor.customerName }]}>
            <InputAntd
              style={styleInput}
              type='text'
              placeholder={placeholderFormInfor.customerName}
            />
          </Form.Item>
          <Flex gap={30}>
            <BackButton
              redirect={EnumPathVTM.OPTIONS}
              content='Danh mục dịch vụ'
            />
            <Form.Item>
              <ButtonRootAntD
                style={stylePrimaryButton}
                type='primary'
                htmlType='submit'>
                Tiếp tục
              </ButtonRootAntD>
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default RegisterLicenseView;
