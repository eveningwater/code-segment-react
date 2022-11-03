import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('确定要离开吗?');
    if (exit) window.close();
  });
  return <div>尝试关闭窗口。</div>;
};
export default Demo;
