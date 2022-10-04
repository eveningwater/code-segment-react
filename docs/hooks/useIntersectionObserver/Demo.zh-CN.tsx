import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
const Demo = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onScreen = useIntersectionObserver(ref, { threshold: 0.5 });
  return (
    <div>
      <div style={{ height: '100vh' }}>往下滚动</div>
      <div style={{ height: '100vh' }} ref={ref}>
        <p>{onScreen ? '元素在屏幕上.' : '滚动更多!'}</p>
      </div>
    </div>
  );
};
export default Demo;
