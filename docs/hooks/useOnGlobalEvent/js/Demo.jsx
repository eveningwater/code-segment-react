import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e) => {
    const { x, y } = e;
    console.log(`(${x}, ${y})`);
  });
  return <p>Move your mouse around</p>;
};

export default Demo;
