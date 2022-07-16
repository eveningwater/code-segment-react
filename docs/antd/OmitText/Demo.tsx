import React from 'react';
import OmitText from './OmitText';

const Index = () => {
  const text =
    '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的测试文本';
  return (
    <OmitText width={120} showTooltip>
      {text}
    </OmitText>
  );
};

export default Index;
