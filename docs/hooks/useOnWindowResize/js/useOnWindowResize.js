import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback) => {
  const listener = useRef(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', listener.current);
    };
  }, [callback]);
};

export default useOnWindowResize;
