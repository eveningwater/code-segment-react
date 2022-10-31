import { useRef, useEffect } from 'react';

export type AnyFunc = (...args: any[]) => any;

const useTimeout = (callback: AnyFunc, delay: number) => {
  const savedCallback = useRef<AnyFunc>();
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
