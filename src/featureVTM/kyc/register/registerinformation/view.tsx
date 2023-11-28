/* eslint-disable eqeqeq */
import { Loader } from '@progress/kendo-react-indicators';
import { Col, Flex, Form, Row, Space, Typography } from 'antd';

// import { useEffect } from 'react';
import { ButtonRootAntD } from '@/coreVTM/button';
import { CheckboxRootAntD } from '@/coreVTM/checkbox';
import { DatePickerAntd } from '@/coreVTM/datePickerAntd/DatePickerAntd';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import { SelectionCommon } from '@/coreVTM/selection/Selection';
import { styleH1, stylePrimaryButton, styleSecondaryButton } from '@/featureVTM/type';

import {
  gutterRow,
  inputStyle,
  labelFormInfor,
  lgCol,
  optionCity,
  optionSelect,
  optionSelectNationality,
  optionSelectSex,
  placeholderFormInfor,
  requiedFormInfor,
  VIEW_REGISTER_VTM,
} from '../type';

interface IRegisterProps {
  handleSubmit?: (values: any) => void;
  loading?: boolean;
  responseSuccess?: any;
  handleBack: (step: VIEW_REGISTER_VTM) => void;
  handleGetResponseSuccess: any;
  handleChangeInputPhone: (value: any) => void;
  handleChangeInputEmail: (value: any) => void;
  isErrorPhone?: boolean;
  isErrorEmail?: boolean;
  isShow?: boolean;
}

const RegisterInformationView = ({
  handleChangeInputPhone,
  handleChangeInputEmail,
  handleSubmit,
  handleBack,
  responseSuccess,
  isErrorPhone,
  isErrorEmail,
  isShow,
}: IRegisterProps) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  form.setFieldsValue({
    customerName: responseSuccess?.responseLicense?.customerName,
    license: responseSuccess?.responseLicense?.license,
    nationality: optionSelectNationality[0],
    sex: optionSelectSex[0],
    licenseType:
      optionSelect[
        responseSuccess?.responseLicense?.licenseType?.key ? 0 : responseSuccess?.responseLicense?.licenseType
      ],
  });
  if (!responseSuccess) return <Loader />;
  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
      justify='center'
      align='center'>
      <Space
        direction='vertical'
        style={{ width: '40%', backgroundColor: '#fff', borderRadius: 10, padding: 40 }}>
        <Title
          level={1}
          style={styleH1}>
          Đăng ký
        </Title>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.customerName}
                name='customerName'
                key='customerName'>
                <InputAntd
                  disabled
                  style={inputStyle}
                  type='text'
                  placeholder={placeholderFormInfor.customerName}
                />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.phone}
                key='phone'
                name='phone'
                rules={[
                  { required: true, message: requiedFormInfor.phone },
                  // { pattern: /^[+]?[(]?[0-9]{4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,4}$/im, message: 'phone is invalid' },
                  { required: isErrorPhone, message: 'số điện thoại bị trùng' },
                ]}>
                <InputAntd
                  style={inputStyle}
                  type='text'
                  placeholder={placeholderFormInfor.phone}
                  onChange={handleChangeInputPhone}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.nationality}
                key='nationality'
                name='nationality'>
                <SelectionCommon
                  disable
                  options={optionSelectNationality}
                />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                key='email'
                label={labelFormInfor.email}
                name='email'
                rules={[
                  { required: true, message: requiedFormInfor.email },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email invalid',
                  },
                  { required: isErrorEmail, message: 'Email bị trùng' },
                ]}>
                <InputAntd
                  style={inputStyle}
                  type='email'
                  placeholder={placeholderFormInfor.email}
                  onChange={handleChangeInputEmail}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.sex}
                key='sex'
                name='sex'>
                <SelectionCommon options={optionSelectSex} />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                key='dob'
                name='dob'
                label={labelFormInfor.dod}
                rules={[{ required: true, message: requiedFormInfor.dod }]}>
                <DatePickerAntd
                  format='DD-MM-YYYY'
                  picker='date'
                  placeholder={placeholderFormInfor.dod}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.licenseType}
                key='licenseType'
                name='licenseType'>
                <SelectionCommon
                  disable
                  options={optionSelect}
                />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                key='license'
                name='license'
                label={labelFormInfor.license}>
                <InputAntd
                  disabled
                  style={inputStyle}
                  type='number'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.licenseDate}
                key={'licenseDate'}
                name='licenseDate'
                rules={[{ required: true, message: 'Vui lòng nhập số cccd' }]}>
                <DatePickerAntd
                  format='DD-MM-YYYY'
                  picker='date'
                  placeholder={placeholderFormInfor.licenseDate}
                />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.licensePlace}
                key='licensePlace'
                name='licensePlace'
                rules={[{ required: true, message: 'vui lòng chọn nơi cung cấp' }]}>
                <SelectionCommon
                  options={optionCity}
                  placeholder={placeholderFormInfor.licensePlace}
                />
              </Form.Item>
            </Col>
            {isShow === true && (
              <Col lg={lgCol}>
                <Form.Item
                  label={labelFormInfor.exprideDay}
                  key='exprideDay'
                  name='exprideDay'
                  // rules={[{ required: true, message: '' }]}
                >
                  <DatePickerAntd
                    format='DD-MM-YYYY'
                    picker='date'
                    placeholder={placeholderFormInfor.expiryDate}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.permanentAddr}
                key={'permanentAddr'}
                name='permanentAddr'
                rules={[{ required: true, message: 'Vui lòng nhập số cccd' }]}>
                <InputAntd
                  style={inputStyle}
                  type='text'
                  placeholder={placeholderFormInfor.permanentAddr}
                />
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item
                label={labelFormInfor.inviteCode}
                key={'inviteCode'}
                name='inviteCode'>
                <InputAntd
                  style={inputStyle}
                  type='text'
                  placeholder={placeholderFormInfor.inviteCode}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutterRow}>
            <Col lg={lgCol}>
              <Form.Item
                key={'isRegCard'}
                name='isRegCard'
                rules={[{ required: true, message: requiedFormInfor.isRegCard }]}>
                <CheckboxRootAntD content='Chấp nhận điều khoản ' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col lg={lgCol}>
              <Form.Item>
                <ButtonRootAntD
                  style={styleSecondaryButton}
                  htmlType='submit'
                  onClick={() => {
                    handleBack(VIEW_REGISTER_VTM.REGISTER);
                  }}>
                  Quay lại
                </ButtonRootAntD>
              </Form.Item>
            </Col>
            <Col lg={lgCol}>
              <Form.Item>
                <ButtonRootAntD
                  style={stylePrimaryButton}
                  type='primary'
                  htmlType='submit'>
                  Tiếp tục
                </ButtonRootAntD>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </Flex>
  );
};

export default RegisterInformationView;
