import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>滚动并检查控制台</p>;
};

export default Demo;
