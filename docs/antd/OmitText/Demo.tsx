import { Space } from 'antd';
import React from 'react';
import OmitText from './OmitText';

const Index = () => {
  const text =
    '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的测试文本';
  //TooltipProps配置属性同antd的tooltip
  return (
    <Space>
      <OmitText width={120} showTooltip>
        {text}
      </OmitText>
      <OmitText
        width={120}
        showTooltip
        tooltipProps={{ color: '#2396ef', placement: 'right' }}
      >
        {text}
      </OmitText>
      <OmitText
        width="100%"
        showTooltip
        tooltipProps={{ color: '#2396ef', placement: 'right' }}
      >
        {text}
      </OmitText>
    </Space>
  );
};

export default Index;
