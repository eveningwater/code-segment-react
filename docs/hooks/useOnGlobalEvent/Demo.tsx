import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e: Event) => {
    const { x, y } = e as MouseEvent;
    console.log(`(${x}, ${y})`);
  });
  return <p>Move your mouse around</p>;
};

export default Demo;
