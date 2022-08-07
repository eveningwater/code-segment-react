import React from 'react';
import useComponentWillUnmount from './useComponentWillUnmount';

const UnMounter = () => {
  useComponentWillUnmount(() => console.log('组件即将卸载'));
  return <div>检查控制台</div>;
};

const Demo = () => <UnMounter />;

export default Demo;
