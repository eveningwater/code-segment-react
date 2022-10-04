import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
const Demo = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onScreen = useIntersectionObserver(ref, { threshold: 0.5 });
  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div style={{ height: '100vh' }} ref={ref}>
        <p>{onScreen ? 'Element is on screen.' : 'Scroll more!'}</p>
      </div>
    </div>
  );
};
export default Demo;
