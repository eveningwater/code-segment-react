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
      label: '选项卡1',
      value: '0',
    },
    {
      label: '选项卡2',
      value: '1',
    },
    {
      label: '选项卡3',
      value: '2',
    },
    {
      label: '选项卡4',
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
        onChange={(tab) => console.log('图片选项卡:', tab)}
      />
      <AnimationTabs
        tabs={textTabs}
        currentTab={`${textTabActiveIndex}`}
        transitionDuration={100}
        onChange={(tab) => console.log('文字选项卡:', tab)}
      />
    </Space>
  );
};

export default Demo;
