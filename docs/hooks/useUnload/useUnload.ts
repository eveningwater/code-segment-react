import { useRef, useEffect } from 'react';

const useUnload = (handler: (...args: any[]) => any) => {
  const cb = useRef(handler);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;
