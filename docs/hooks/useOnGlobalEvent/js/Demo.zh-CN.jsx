import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e) => {
    const { x, y } = e;
    console.log(`(${x}, ${y})`);
  });
  return <p>移动你的鼠标</p>;
};

export default Demo;
