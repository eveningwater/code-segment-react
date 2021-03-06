import { Space } from 'antd';
import React from 'react';
import OmitText from './OmitText';

const Index = () => {
  const text =
    'This is a long long long long long long long long long long long long long long long long long long long long long long long long long long long test text';
  //tooltipProps配置属性同antd的tooltip
  return (
    <Space>
      <OmitText>{text}</OmitText>
      <OmitText tooltipProps={{ color: '#2396ef', placement: 'right' }}>
        {text}
      </OmitText>
      <OmitText
        width="90%"
        tooltipProps={{ color: '#ff0002', placement: 'bottom' }}
      >
        {text}
      </OmitText>
    </Space>
  );
};

export default Index;
