import { useEffect, DependencyList, useRef } from 'react';
const useComponentDidUpdate = (
  handler: (...args: any[]) => any,
  deps: DependencyList,
) => {
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
