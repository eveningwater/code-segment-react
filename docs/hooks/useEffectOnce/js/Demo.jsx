import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('mounted');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>Click me!</Button>;
};

export default Demo;
