import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(
    document.querySelector('title')!,
  ) as JSXElementConstructor<any>;

  return (
    <p>
      hello,world!
      <Portal>Portalized Title</Portal>
    </p>
  );
};

export default Demo;
