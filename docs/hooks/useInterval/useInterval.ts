import { useEffect, useRef } from 'react';
export type CallbackType = (...args: any) => any;
const useInterval = (callback: CallbackType, delay: number) => {
  const savedCallback = useRef<CallbackType>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
