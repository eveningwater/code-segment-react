import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      窗口大小: ({width} x {height})
    </p>
  );
};

export default Demo;
