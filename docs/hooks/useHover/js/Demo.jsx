import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

export default Demo;
