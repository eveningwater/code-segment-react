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
          Current: {value} - Previous: {lastValue}
        </>
      </p>
      <Button onClick={() => setValue(value + 1)}>Increment</Button>
    </div>
  );
};

export default Demo;
