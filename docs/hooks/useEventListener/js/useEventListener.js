import { useRef, useEffect } from 'react';

const useEventListener = (type, handler, el = window) => {
  const saveHandler = useRef();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
