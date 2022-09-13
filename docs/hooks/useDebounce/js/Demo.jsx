import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        Increment
      </Button>
    </div>
  );
};

export default Demo;
