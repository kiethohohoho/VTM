import { type StepProps, type StepsProps } from 'antd';
import { type ReactNode } from 'react';

export interface stepItemProps extends StepProps {
  key?: number | string | undefined;
  content?: string | ReactNode;
}
export interface stepsCommonProps extends StepsProps {
  items?: stepItemProps[];
}
