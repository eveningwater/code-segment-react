import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicEffect = (effect, deps) => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
