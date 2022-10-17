import { useRef, useEffect } from 'react';

const useOnWindowScroll = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener(
        'scroll',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowScroll;
