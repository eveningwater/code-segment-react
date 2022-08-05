import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useComponentDidMount(() =>
    console.log(
      '组件确实挂载，获取元素:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
