import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useComponentDidUpdate from './useComponentDidUpdate';
import { Space } from 'antd';
const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('当前的值是:' + value + '。');
  }, [value]);
  return (
    <>
      <p>
        值是:{value},其它值是: {otherValue}
      </p>
      <Space>
        <Button type="primary" onClick={() => setValue(value + 1)}>
          增加值
        </Button>
        <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
          增加其它值
        </Button>
      </Space>
    </>
  );
};

export default Demo;
