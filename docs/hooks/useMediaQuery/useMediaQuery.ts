import { useState, useEffect } from 'react';

const useMediaQuery = <T extends string, U, K>(
  query: T,
  whenTrue: U,
  whenFalse: K,
): U | K => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return whenFalse;
  }

  const mediaQuery = window.matchMedia(query);

  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
