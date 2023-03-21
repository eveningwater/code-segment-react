import type { MutableRefObject, DependencyList, Ref } from 'react';
import { useImperativeHandle, useEffect, useRef } from 'react';

export const useChildrenHandler = <T, K extends object>(
  originRef: MutableRefObject<T>,
  handler: K,
  deps?: DependencyList,
): void =>
  useImperativeHandle(
    originRef,
    () => {
      return {
        ...originRef.current,
        ...handler,
      };
    },
    deps,
  );

export type ImperFunc = (...args: any[]) => any;
export type ImperRef = Record<string, ImperFunc>;
export type ImperItem = {
  ref: Ref<ImperRef>;
};
let timer: ReturnType<typeof setTimeout>;
// see this:https://www.aaron-powell.com/posts/2019-09-23-recursive-settimeout-with-react-hooks/
export const useTimeout = (callback: (...args: any []) => any, delay = 1000) => {
  const ref = useRef() as MutableRefObject<() => void>;
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
