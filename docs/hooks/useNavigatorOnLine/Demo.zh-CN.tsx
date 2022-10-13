import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>你{isOnline ? '在线' : '离线'}</span>;
};

export default Demo;
