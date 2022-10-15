import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (
  type: string,
  callback: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  const listener = useRef<void | null>(null);
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
      window.removeEventListener(
        type,
        listener.current as unknown as EventListenerOrEventListenerObject,
        options,
      );
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
