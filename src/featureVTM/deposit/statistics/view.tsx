import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { styleBg, styleBoxShadow, styleH1, styleH3, stylePrimaryButton, styleSecondaryButton } from '@/featureVTM/type';
import AuthService from '@/utils/Auth';
import { EnumPathVTM } from '@/utils/Enums';

import { VIEW_DEPOSIT_VTM } from '../type';
interface StatisticsViewProps {
  loading?: boolean;
  handleSubmit: () => void;
  handleGetResponseSuccess: any;
}
const StatisticsView = ({ handleSubmit, handleGetResponseSuccess }: StatisticsViewProps) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <Flex
      style={styleBg}
      vertical>
      <Flex
        vertical
        gap={30}
        justify='center'
        style={{ backgroundColor: '#fff', padding: 40, borderRadius: 8, boxShadow: styleBoxShadow }}>
        <Title
          level={1}
          style={styleH1}>
          Thống kê số tiền vừa nộp
        </Title>
        <Space direction='vertical'>
          <Space>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              Mệnh giá
            </Title>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              Số lượng
            </Title>
          </Space>
          <Space>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              500.000
            </Title>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              1
            </Title>
          </Space>
          <Space>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              200.000
            </Title>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              2
            </Title>
          </Space>
          <Space>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              100.000
            </Title>
            <Title
              style={{ ...styleH3, color: '#151515' }}
              level={3}>
              1
            </Title>
          </Space>
          <Title
            style={{ ...styleH3, color: '#151515' }}
            level={3}>
            Tổng cộng: 1.000.000
          </Title>
        </Space>
        <Flex
          gap={30}
          style={{ width: 500 }}>
          <ButtonRootAntD
            style={styleSecondaryButton}
            size='large'
            onClick={() => {
              AuthService.removeAll();
              navigate(EnumPathVTM.HOME);
            }}>
            Hủy giao dịch
          </ButtonRootAntD>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={() => {
              handleGetResponseSuccess({ view: VIEW_DEPOSIT_VTM.DEPOSIT_WAIT });
            }}>
            Nộp thêm tiền
          </ButtonRootAntD>
          <ButtonRootAntD
            style={stylePrimaryButton}
            size='large'
            onClick={handleSubmit}>
            Xác nhận
          </ButtonRootAntD>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StatisticsView;
