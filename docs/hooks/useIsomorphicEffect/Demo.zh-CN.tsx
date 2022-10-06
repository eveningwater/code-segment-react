import useIsomorphicEffect from './useIsomorphicEffect';
import React from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('你好');
  }, []);
  return <div>请打开控制台查看!</div>;
};

export default Demo;
