import React from 'react';
import useComponentWillUnmount from './useComponentWillUnmount';

const UnMounter = () => {
  useComponentWillUnmount(() => console.log('Component will unmount'));
  return <div>Check the console</div>;
};

const Demo = () => <UnMounter />;

export default Demo;
