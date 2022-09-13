import React, { useState } from 'react';
import Button from '../../guide/Button/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        当前值: {value} - 防抖值: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        增加
      </Button>
    </div>
  );
};

export default Demo;
