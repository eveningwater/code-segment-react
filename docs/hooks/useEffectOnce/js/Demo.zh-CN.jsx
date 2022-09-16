import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('已经被挂载');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>点击我!</Button>;
};

export default Demo;
