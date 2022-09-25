import { useState, useEffect } from 'react';

const useFetch = (url: string, options: RequestInit) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [abort, setAbort] = useState<AbortController['abort']>(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        // Create a function to apply the abort method
        // Not to write as setAbort(abortController.abort)
        setAbort(() => abortController.abort());
        const res = await fetch(url, { ...options, signal });
        const data = await res.json();
        setResponse(data);
      } catch (error: unknown) {
        setError(error);
      }
    };

    fetchData();
    return () => {
      abort?.();
    };
  }, []);

  return { response, error, abort };
};

export default useFetch;
