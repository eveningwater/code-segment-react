import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (type, callback, options) => {
  const listener = useRef(null);
  const previousProps = useRef({ type, options });
  useEffect(() => {
    const { type: previousType, options: previousOptions } =
      previousProps.current;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions,
      );
    }
    listener.current = window.addEventListener(type, callback);
    previousProps.current = { type, options };
    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
