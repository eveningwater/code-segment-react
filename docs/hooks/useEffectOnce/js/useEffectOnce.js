import { useEffect, useRef } from 'react';

const useEffectOnce = (callback, when) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
