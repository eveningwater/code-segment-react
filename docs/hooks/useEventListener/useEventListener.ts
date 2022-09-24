import { useRef, useEffect } from 'react';

export type ELementType = HTMLElement | Element | Document | Window;
export type HandlerType = (...args: any[]) => any;

const useEventListener = (
  type: string,
  handler: HandlerType,
  el: ELementType = window,
) => {
  const saveHandler = useRef<HandlerType>();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: Event | MouseEvent) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
