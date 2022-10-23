import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(document.querySelector('title'));

  return (
    <p>
      你好，世界!
      <Portal>传送门标题</Portal>
    </p>
  );
};

export default Demo;
