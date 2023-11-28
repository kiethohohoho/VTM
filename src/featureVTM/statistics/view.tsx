import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { EnumPathVTM } from '@/utils/Enums';

import { styleBg, styleBoxShadow, styleH1, stylePrimaryButton } from '../type';

const StatisticsView = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <Flex
      style={styleBg}
      vertical>
      <Flex
        vertical
        align='center'
        justify='center'
        style={{ backgroundColor: '#fff', padding: 40, borderRadius: 8, boxShadow: styleBoxShadow }}>
        <Title
          level={1}
          style={styleH1}>
          Thống kê số tiền vừa nộp
        </Title>
        <Space direction='vertical'>
          <Space>
            <Title level={2}>Mệnh giá</Title>
            <Title level={2}>Số lượng</Title>
          </Space>
          <Space>
            <Title level={2}>500.000</Title>
            <Title level={2}>3</Title>
          </Space>
          <Space>
            <Title level={2}>200.000</Title>
            <Title level={2}>2</Title>
          </Space>
          <Space>
            <Title level={2}>100.000</Title>
            <Title level={2}>1</Title>
          </Space>
          <Title>Tổng cộng: 2.000.000</Title>
        </Space>
        <Space
          size={26}
          direction='vertical'
          style={{ marginTop: 40, width: 500 }}>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              navigate(EnumPathVTM.DEPOSITRESULT);
            }}>
            Xác nhận
          </ButtonRootAntD>

          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              navigate(EnumPathVTM.WAITMONEY);
            }}>
            Nộp thêm tiền
          </ButtonRootAntD>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              navigate(EnumPathVTM.SELECT);
            }}>
            Hủy giao dịch
          </ButtonRootAntD>
        </Space>
      </Flex>
    </Flex>
  );
};

export default StatisticsView;
