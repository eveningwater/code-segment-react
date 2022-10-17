import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>Scroll and check the console</p>;
};

export default Demo;
