import { useImperativeHandle, useEffect, useRef } from 'react';

export const useChildrenHandler = (originRef, handler, deps) =>
  useImperativeHandle(
    originRef,
    () => ({
      ...originRef.current,
      ...handler,
    }),
    deps,
  );
let timer;
// see this:https://www.aaron-powell.com/posts/2019-09-23-recursive-settimeout-with-react-hooks/
export const useTimeout = (callback, delay = 1000) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = callback;
  });
  useEffect(() => {
    const handler = () => {
      ref.current();
      timer = setTimeout(handler, delay);
    };
    handler();
    return () => clearTimeout(timer);
  }, [delay]);
};
