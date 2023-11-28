import { Flex, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@/coreVTM/backbutton';
import { ButtonRootAntD } from '@/coreVTM/button';
import { CollapseSingleCommon } from '@/coreVTM/collapseSingle/CollapseSingle';
import AuthService from '@/utils/Auth';
import { EnumPathVTM } from '@/utils/Enums';

import { optionwithAddMoney, optionwithCard } from '../options';
import OptionsCommon from '../options/components/view';
import { styleBg, styleBoxShadow, styleH1, styleH3, styleSecondaryButton } from '../type';
const SelectView = () => {
  const auth = AuthService.getPackageAuth();
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <Flex style={styleBg}>
      <Space
        style={{ backgroundColor: '#fff', padding: 40, borderRadius: 10, boxShadow: styleBoxShadow }}
        direction='vertical'
        align='center'>
        <Title
          level={1}
          style={styleH1}>
          Chọn dịch vụ
        </Title>
        <Space align='center'>
          <CollapseSingleCommon
            key={1}
            header={
              <Title
                level={3}
                style={styleH3}>
                Rút tiền
              </Title>
            }
            extra={
              <OptionsCommon
                data={optionwithCard(auth)}
                content='Lựa chọn các phương thức rút tiền sau đây'
              />
            }
          />
          <CollapseSingleCommon
            key={1}
            header={
              <Title
                level={3}
                style={styleH3}>
                Nộp tiền
              </Title>
            }
            extra={
              <OptionsCommon
                data={optionwithAddMoney(auth)}
                content='Lựa chọn các phương thức nộp tiền sau đây'
              />
            }
          />
        </Space>
        <Flex style={{ width: '100%' }}>
          <BackButton
            redirect={EnumPathVTM.OPTIONS}
            content='Quay lại trang Danh mục dịch vụ'
          />
          {auth && (
            <ButtonRootAntD
              onClick={() => {
                navigate(EnumPathVTM.HOME);
                AuthService.handleLogout();
              }}
              style={{ ...styleSecondaryButton, marginLeft: 20 }}>
              Thoát Và Đăng xuất
            </ButtonRootAntD>
          )}
        </Flex>
      </Space>
    </Flex>
  );
};

export default SelectView;
