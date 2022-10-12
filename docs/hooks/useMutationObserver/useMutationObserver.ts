import { useEffect } from 'react';
import type { RefObject } from 'react';

const useMutationObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
};

export default useMutationObserver;
