import './view.scss';

import { Space, Typography } from 'antd';
import classNames from 'classnames';
import { type FC, type ReactNode } from 'react';

import { styleBoxShadow } from '@/featureVTM/type';

interface optionItemProps {
  content?: ReactNode | string | number;
  value?: any;
  onChange?: any;
  isActive?: boolean;
  accountNumber?: number;
  balance?: number;
  currency?: string;
}
const OptionItem: FC<optionItemProps> = ({ currency, balance, accountNumber, content, value, onChange, isActive }) => {
  const handleChange = () => {
    if (!isActive) {
      onChange(value);
    }
  };

  const formatString = (input: any): string => {
    const spacePositions: number[] = [3, 10];
    let formattedString: string = input.toString();
    spacePositions.forEach(position => {
      formattedString = insertSpace(formattedString, position);
    });

    return formattedString;
  };

  const insertSpace = (str: string, index: number): string => {
    return str.slice(0, index) + ' ' + str.slice(index);
  };

  const { Text } = Typography;
  return (
    <Space
      style={{
        cursor: 'pointer',
        padding: 20,
        backgroundColor: isActive ? '#6492FF' : '#E7E7E7',
        width: 260,
        borderRadius: 4,
        boxShadow: styleBoxShadow,
      }}
      direction='vertical'
      className={classNames({ active: isActive })}
      onClick={handleChange}>
      <Text
        style={{
          color: isActive ? '#fff' : '#000',
          fontSize: 15,
        }}>
        Tổng số dư khả dụng
      </Text>
      <Text
        style={{
          color: isActive ? '#fff' : '#000',
          fontSize: 20,
          fontWeight: 'bold',
          margin: 0,
        }}>
        {balance?.toLocaleString('vi-VN', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}{' '}
        {currency}
      </Text>
      <Text
        style={{
          color: isActive ? '#fff' : '#000',
          fontSize: 15,
        }}>
        {formatString(accountNumber)}
      </Text>
    </Space>
  );
};

export default OptionItem;
