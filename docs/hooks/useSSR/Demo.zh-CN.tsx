import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? '运行在浏览器环境中' : '运行在服务端环境中'}</p>;
};

export default Demo;
