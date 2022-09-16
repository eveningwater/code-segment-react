import { useEffect, useRef } from 'react';

const useEffectOnce = <T, U>(callback: (...args: T[]) => void, when: U) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
