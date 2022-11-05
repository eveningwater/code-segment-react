import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: ({width} x {height})
    </p>
  );
};

export default Demo;
