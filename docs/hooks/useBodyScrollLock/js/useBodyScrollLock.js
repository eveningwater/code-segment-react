import { useLayoutEffect } from 'react';

const useBodyScrollLock = () => {
  // see https://zhuanlan.zhihu.com/p/147173241
  useLayoutEffect(() => {
    const container = document.body;
    const originOverflowStyle = window.getComputedStyle(container).overflow;
    container.style.overflow = 'hidden';
    return () => {
      container.style.overflow = originOverflowStyle;
    };
  }, []);
};

export default useBodyScrollLock;
