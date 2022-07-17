import { Space } from 'antd';
import React from 'react';
import OmitText from './OmitText';

const Index = () => {
  const text =
    '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的测试文本';
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
