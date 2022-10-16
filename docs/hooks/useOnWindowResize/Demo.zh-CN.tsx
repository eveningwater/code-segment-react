import React from 'react';
import useOnWindowResize from './useOnWindowResize';

const Demo = () => {
  useOnWindowResize(() => {
    console.log(`窗口大小: (${window.innerWidth}, ${window.innerHeight})`);
  });
  return <p>调整窗口大小并检查控制台。</p>;
};

export default Demo;
