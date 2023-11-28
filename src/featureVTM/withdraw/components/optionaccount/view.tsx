import { Space } from 'antd';
import { type FC, type Key } from 'react';

import OptionItem from '../optionitem/view';

interface OptionsAccountProps {
  options?: any;
  onChange?: any;
  value?: string | number | undefined;
}

interface OptionsItem {
  value: Key | null | undefined;
  accountNumber: number | undefined;
  currency: string | undefined;
  balance: number | undefined;
}

const OptionsAccount: FC<OptionsAccountProps> = ({ options, onChange, value }) => {
  console.log('option', options);

  return (
    <Space
      direction='vertical'
      size={20}>
      {options &&
        options?.length > 0 &&
        options?.map((item: OptionsItem) => {
          // const customValue = { accountNumber: item.accountNumber, balance: item.balance };
          return (
            <OptionItem
              key={item.value}
              isActive={item.accountNumber === value}
              value={item.accountNumber}
              accountNumber={item.accountNumber}
              currency={item.currency}
              balance={item.balance}
              onChange={onChange}
            />
          );
        })}
    </Space>
  );
};

export default OptionsAccount;
