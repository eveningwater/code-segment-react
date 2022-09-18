import { useState, useEffect, useCallback } from 'react';
const useError = (err) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
