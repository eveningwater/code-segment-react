import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    '宽度小于 400 像素',
    '宽度大于 400 像素',
  );
  return <span>{text}</span>;
};

export default Demo;
