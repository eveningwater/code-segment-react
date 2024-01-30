import { useEffect, useRef } from 'react';
const useComponentDidUpdate = (handler, deps) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      handler?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useComponentDidUpdate;
