import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useComponentDidUpdate from './useComponentDidUpdate';
import { Space } from 'antd';
const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('Current value is:' + value + '.');
  }, [value]);
  return (
    <>
      <p>
        Value:{value},otherValue: {otherValue}
      </p>
      <Space>
        <Button type="primary" onClick={() => setValue(value + 1)}>
          Increment value
        </Button>
        <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
          Increment other value
        </Button>
      </Space>
    </>
  );
};

export default Demo;
