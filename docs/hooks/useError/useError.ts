import { useState, useEffect, useCallback } from 'react';
const useError = <T>(err: T): ((...args: any) => void) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: T) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
