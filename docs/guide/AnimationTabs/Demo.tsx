import { Space } from 'antd';
import React, { useState } from 'react';
import AnimationTabs from './AnimationTabs';
const Demo = () => {
  const imageTabs = [
    {
      index: 1,
      value: '0',
    },
    {
      index: 2,
      value: '1',
    },
    {
      index: 3,
      value: '2',
    },
    {
      index: 4,
      value: '3',
    },
  ];
  const textTabs = [
    {
      label: 'tabs1',
      value: '0',
    },
    {
      label: 'tabs2',
      value: '1',
    },
    {
      label: 'tabs3',
      value: '2',
    },
    {
      label: 'tabs4',
      value: '3',
    },
  ];
  const [imageTabActiveIndex] = useState(0);
  const [textTabActiveIndex] = useState(0);
  return (
    <Space wrap>
      <AnimationTabs
        imageTabs={imageTabs}
        type="circle"
        currentTab={`${imageTabActiveIndex}`}
        transitionDuration={100}
        onChange={(tab) => console.log('The image tabs:', tab)}
      />
      <AnimationTabs
        tabs={textTabs}
        currentTab={`${textTabActiveIndex}`}
        transitionDuration={100}
        onChange={(tab) => console.log('The text tabs:', tab)}
      />
    </Space>
  );
};

export default Demo;
