import React, { useState } from 'react';
import usePrevious from './usePrevious';
import { Button } from 'antd';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        <>
          当前值: {value} - 之前值: {lastValue}
        </>
      </p>
      <Button onClick={() => setValue(value + 1)}>增加</Button>
    </div>
  );
};

export default Demo;
