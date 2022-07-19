import React from 'react';
import FileDrop from './FileDrop';

const Demo = () => {
  return <FileDrop onDrop={console.log} emptyText="拖拽文件到这里!" />;
};
export default Demo;
