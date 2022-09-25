import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => abortController.abort());
        const res = await fetch(url, { ...options, signal });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
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
