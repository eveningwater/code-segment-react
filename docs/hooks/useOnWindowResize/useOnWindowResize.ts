import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener(
        'resize',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowResize;
