import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('Are you sure you want to leave?');
    if (exit) window.close();
  });
  return <div>Try closing the window.</div>;
};
export default Demo;
