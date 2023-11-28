import { Flex, Space, Typography } from 'antd';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonRootAntD } from '@/coreVTM/button';
import { stylePrimaryButton } from '@/featureVTM/type';
import AuthService from '@/utils/Auth';

import { type ModalOptionProps } from './type';

const OptionsCommon: FC<ModalOptionProps> = ({ openModal, closeModal, options, data, content }) => {
  const { Text, Title } = Typography;
  const navigate = useNavigate();
  const auth = AuthService.getPackageAuth();
  const handleOptionClick = (optionItem: any) => {
    const redirecDestination = optionItem?.redirectUrl;
    // console.log("optionItem",optionItem)
    // console.log('redirectDestinationWhenClick', redirecDestination);
    // const redirectParam = redirecDestination && `?redirect=${redirecDestination}` ;
    // console.log('redirectParamWhenClick', redirectParam);
    // navigate(`${optionItem?.linkTo}${redirectParam}`);
    // if (auth) {
    //   navigate(decodeURIComponent(optionItem?.redirect));
    //   return;
    // }
    // navigate(`/login?cb_url=${encodeURIComponent(optionItem?.redirect)}`);
    if (auth) {
      navigate(`${redirecDestination}`);
      return;
    }
    navigate(`/login?redirect=${redirecDestination}`);
  };
  return (
    <Flex
      vertical
      justify='center'
      align='center'>
      <Title
        style={{ margin: 0 }}
        level={5}>
        {content}
      </Title>
      <Space
        direction='vertical'
        align='center'>
        {data?.map(item => (
          <Space
            key={item.title}
            direction='vertical'
            size={12}
            align='center'>
            <Text>{item.title}</Text>
            {item.optionname?.map(item => (
              <div key={item.type}>
                <ButtonRootAntD
                  style={stylePrimaryButton}
                  onClick={() => {
                    handleOptionClick(item);
                  }}>
                  {item.option}
                </ButtonRootAntD>
              </div>
            ))}
          </Space>
        ))}
      </Space>
    </Flex>
  );
};

export default OptionsCommon;
