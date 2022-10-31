import { useRef, useEffect } from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();
    if (typeof delay === 'number') {
      let id = setTimeout(tick, delay);
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
};

export default useTimeout;
