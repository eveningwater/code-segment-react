import { useState, useCallback, useEffect } from 'react';
const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);
  const onHashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', onHashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;
