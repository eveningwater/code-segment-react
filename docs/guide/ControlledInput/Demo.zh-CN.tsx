import React, { useState } from 'react';
import ControlledInput from './ControlledInput';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <ControlledInput
      type="text"
      value={value}
      onChange={setValue}
      placeholder="请输入一些提示信息..."
    ></ControlledInput>
  );
};

export default Demo;
