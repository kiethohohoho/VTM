import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { ImageRootAntD } from '@/coreVTM/image';
import { styleH1, stylePrimaryButton } from '@/featureVTM/type';
import { EnumPathVTM } from '@/utils/Enums';

const RegisterSuccessView = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  return (
    <Flex
      justify='center'
      align='center'
      style={{ width: '100%', height: '100%' }}>
      <Space
        direction='vertical'
        size={30}
        align='center'
        style={{ borderRadius: 10, backgroundColor: '#fff', padding: 60 }}>
        <Title
          level={1}
          style={styleH1}>
          Đăng ký thành công
        </Title>
        <div style={{ width: 108 }}>
          <ImageRootAntD
            ratio='108x97'
            src='https://vtm.intelin.vn/assets/images/newVersion/logo-success.45669fbc.png'
          />
        </div>
        <Text>Tài khoản của Quý khách đang chờ duyệt</Text>
        <Text>Vui lòng đến chi nhánh ngân hàng ABC gần nhất để cập nhật thông tin</Text>
        <ButtonRootAntD
          style={stylePrimaryButton}
          type='primary'
          onClick={() => {
            navigate(EnumPathVTM.LOGIN);
          }}>
          Tìm điểm giao dich
        </ButtonRootAntD>
      </Space>
    </Flex>
  );
};

export default RegisterSuccessView;
