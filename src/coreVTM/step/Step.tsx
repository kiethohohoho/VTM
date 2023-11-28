import { Steps } from 'antd';
import React, { memo } from 'react';

import { type stepsCommonProps } from './type';

// const { Step } = Steps;

// eslint-disable-next-line react/display-name
export const StepsCommon = memo(({ current, onChange, items = [], direction }: stepsCommonProps) => {
  const itemrender = items.map(item => ({
    key: item?.title,
    title: item?.title,
    description: item?.description,
    content: item?.content,
  }));
  return (
    <Steps
      current={current}
      onChange={onChange}
      direction={direction}
      items={itemrender}
    />
  );
});
