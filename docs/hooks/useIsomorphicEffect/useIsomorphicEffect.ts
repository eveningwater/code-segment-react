import { useEffect, useLayoutEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';
const useIsomorphicEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
): void => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
