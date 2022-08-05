import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useComponentDidMount(() =>
    console.log(
      'Component did mount, get the element:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
