import React from 'react';
import useScript from './useScript';
const script =
  'data:text/plain;charset=utf-8;base64,KGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdIZWxsbycpIH0pKCk7';

const Child = () => {
  const status = useScript(script);
  return <p>子元素状态: {status}</p>;
};

const Demo = () => {
  const status = useScript(script);
  return (
    <>
      <p>父元素状态: {status}</p>
      <Child />
    </>
  );
};

export default Demo;
