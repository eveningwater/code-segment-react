import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};

export default Demo;
