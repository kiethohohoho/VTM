// import { Steps } from 'antd';
// import './StepByStepCommon.scss';

import { type StepProps, type StepsProps } from 'antd';
import { type ReactNode } from 'react';

import { StepsCommon } from '../step/Step';
interface stepItemProps extends StepProps {
  key?: number | string | undefined;
  content?: string | ReactNode;
}
interface stepByStepProps extends StepsProps {
  items?: stepItemProps[];
  current?: any;
}
export const StepByStepCommon = ({ items = [], children, current, onChange }: stepByStepProps) => {
  return (
    <div className='step-common'>
      <StepsCommon
        current={current}
        items={items}
        onChange={onChange}
      />
      <div className='steps-content'>{items[current].content}</div>
      {children}
    </div>
  );
};
