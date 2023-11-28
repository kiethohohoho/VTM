import { Flex, Typography } from 'antd';

import { ScreenLoader } from '@/core2/loader';
import { BackButton } from '@/coreVTM/backbutton';
import { ButtonRootAntD } from '@/coreVTM/button';
import { CollapsibleContent } from '@/coreVTM/collapsible/Collapsible';
import { EnumPathVTM } from '@/utils/Enums';

import { styleBg, styleBoxShadow, styleH1, styleH3, stylePrimaryButton } from '../../type';
import { type Data } from '../../withdraw/account/type';
import OptionsAccount from '../../withdraw/components/optionaccount/view';

interface DepositViewProps {
  loading?: boolean;
  account?: Data;
  handleSelectAccount?: (value: any) => void;
  selectOption?: any;
  handleSubmit: () => void;
}
const DepositView = ({ handleSubmit, account, selectOption, loading, handleSelectAccount }: DepositViewProps) => {
  const { Title } = Typography;
  if (loading) return <ScreenLoader />;
  return (
    <Flex style={styleBg}>
      <Flex
        gap={30}
        vertical
        justify='center'
        align='center'
        style={{ backgroundColor: '#fff', padding: 40, borderRadius: 8, boxShadow: styleBoxShadow }}>
        <Title
          level={1}
          style={styleH1}>
          Nộp tiền
        </Title>
        <Flex>
          <Flex
            gap={20}
            vertical
            align='center'
            style={{ width: '100%' }}>
            <Title
              level={3}
              style={styleH3}>
              Danh sách thẻ thanh toán
            </Title>

            <OptionsAccount
              options={account?.account}
              onChange={handleSelectAccount}
              value={selectOption}
            />
          </Flex>
          <Flex vertical>
            <Title
              level={3}
              style={styleH3}>
              Thông tin hướng dẫn
            </Title>
            <CollapsibleContent
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas unde doloremque illum at recusandae eaque
            temporibus veritatis quidem quo nihil. Atque voluptatem tempore laudantium molestiae similique consequatur
            corrupti eveniet voluptatibus.'
            />
          </Flex>
        </Flex>
        <Flex
          style={{ width: '100%' }}
          align='end'>
          <BackButton
            style={{ width: 'auto', marginRight: 'auto' }}
            content='Quay lại trang Danh mục'
            redirect={EnumPathVTM.SELECT}
          />
          <ButtonRootAntD
            type='primary'
            style={{ ...stylePrimaryButton, width: 'auto', marginLeft: 'auto' }}
            onClick={handleSubmit}>
            Xác nhận
          </ButtonRootAntD>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DepositView;
