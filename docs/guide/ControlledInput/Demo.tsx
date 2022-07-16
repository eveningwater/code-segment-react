import React, { useState } from 'react';
import ControlledInput from './ControlledInput';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <ControlledInput
      type="text"
      value={value}
      onChange={setValue}
      placeholder="Insert some text here..."
    ></ControlledInput>
  );
};

export default Demo;
