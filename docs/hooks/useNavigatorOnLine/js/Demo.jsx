import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>You are {isOnline ? 'online' : 'offline'}</span>;
};

export default Demo;
