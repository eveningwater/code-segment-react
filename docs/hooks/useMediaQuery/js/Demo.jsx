import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide',
  );
  return <span>{text}</span>;
};

export default Demo;
