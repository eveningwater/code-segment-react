import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? '悬浮中' : '未悬浮'}</div>;
};

export default Demo;
